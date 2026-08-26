import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { assetUrl } from '../shared/asset-url';
import {
  buildIndex,
  IconIndex,
  IconSet,
  SetNames,
  type IconRef,
} from './icon-index';

const DATA_DIR = 'assets/icons';

/**
 * Loads the icon data the build wrote into `assets/icons`.
 *
 * `sets.json` is a few kilobytes and loads with the browse page. Names for every
 * set load once (they power search across all sets and the ⌘K palette), and SVG
 * bodies load per variant only when icons from it are about to render.
 */
@Service()
export class IconCatalog {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly indexState = signal<IconIndex | null>(null);
  private readonly bodyState = signal<Record<string, Record<string, string>>>(
    {},
  );
  private readonly loading = new Map<string, Promise<unknown>>();
  private readonly failedState = signal(false);

  /** Null until the names have loaded. */
  readonly index = this.indexState.asReadonly();
  readonly ready = computed(() => this.indexState() !== null);
  /** True once the index has failed to load, so the grid can offer a retry. */
  readonly failed = this.failedState.asReadonly();

  /**
   * Loads sets and names. Safe to call repeatedly.
   *
   * Skipped while prerendering: the data is served as static files, so there is
   * nothing to fetch from, and the grid renders its skeletons until hydration.
   */
  load(): Promise<IconIndex | null> {
    if (!this.isBrowser) {
      return Promise.resolve(null);
    }
    this.failedState.set(false);
    return this.once('index', async () => {
      const sets = await firstValueFrom(
        this.http.get<IconSet[]>(assetUrl(`${DATA_DIR}/sets.json`)),
      );
      const names = await Promise.all(
        sets.map(set =>
          firstValueFrom(
            this.http.get<SetNames>(
              assetUrl(`${DATA_DIR}/${set.slug}.names.json`),
            ),
          ),
        ),
      );

      const namesBySet: Record<string, SetNames> = {};
      sets.forEach((set, i) => (namesBySet[set.slug] = names[i]));

      const index = buildIndex(sets, namesBySet);
      this.indexState.set(index);
      return index;
    }).catch(error => {
      this.failedState.set(true);
      // Swallowed rather than rethrown: every caller is a `void this.load()`
      // that only exists to start the fetch, so an unhandled rejection here
      // reaches the global error listener as noise. `failed` is the signal the
      // grid reads to offer a retry.
      console.error('Could not load the icon index', error);
      return null;
    });
  }

  /** The SVG for an icon, or undefined until its variant has loaded. */
  body(icon: IconRef): string | undefined {
    return this.bodyState()[this.key(icon)]?.[icon.name];
  }

  /** Fetch the bodies for every variant these icons belong to. */
  loadBodies(icons: readonly IconRef[]): void {
    if (!this.isBrowser) {
      return;
    }
    for (const key of new Set(icons.map(icon => this.key(icon)))) {
      if (this.bodyState()[key]) {
        continue;
      }
      // Split once: the slug cannot contain a slash but a variant id may, and
      // splitting on every slash silently truncated it to its first segment.
      const separator = key.indexOf('/');
      const slug = key.slice(0, separator);
      const variant = key.slice(separator + 1);
      this.once(key, async () => {
        const bodies = await firstValueFrom(
          this.http.get<Record<string, string>>(
            assetUrl(`${DATA_DIR}/${slug}.${variant.replace(/\//g, '-')}.json`),
          ),
        );
        this.bodyState.update(current => ({ ...current, [key]: bodies }));
        // One variant failing leaves its cells blank rather than taking the
        // page down with it, and `once` has already dropped the key, so the
        // next render that needs this variant asks again.
      }).catch(() => undefined);
    }
  }

  private key(icon: IconRef): string {
    return `${icon.set.slug}/${icon.variant.id}`;
  }

  /**
   * Runs `work` once per key, keeping the in-flight promise so concurrent
   * callers share it.
   *
   * A rejection drops the key again. Kept, it would pin the failure for the
   * rest of the session: the grid sat on its skeletons for ever and no amount
   * of scrolling or retrying could ask a second time.
   */
  private once<T>(key: string, work: () => Promise<T>): Promise<T> {
    let pending = this.loading.get(key) as Promise<T> | undefined;
    if (!pending) {
      pending = work().catch((error: unknown) => {
        this.loading.delete(key);
        throw error;
      });
      this.loading.set(key, pending);
    }
    return pending;
  }
}
