import { isPlatformBrowser } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { forkJoin, map } from 'rxjs';
import { iconStats } from 'virtual:icon-stats';
import { compact, lifetimeWindows } from './downloads';

/** Icon and set counts, and the published version, measured at build time. */
export const ICON_STATS = iconStats;

/**
 * Stars and downloads. Fetched in the browser so they stay current between
 * deploys; the prerendered HTML ships the figures below rather than an empty
 * space, and a failed request simply leaves those in place.
 *
 * They are placeholders, not a record to maintain: every one of them is
 * replaced on load. Left to be bumped by hand, the all-time total sat at 4.0M
 * while the real figure passed 5M.
 */
@Service()
export class Stats {
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Skipped while prerendering. Five requests to GitHub and npm per route
  // slowed the build and made it depend on their rate limits, and the fetched
  // values would have been baked into static HTML anyway.
  private readonly enabled = signal(false);
  private readonly shouldLoad = computed(
    () => this.enabled() && this.isBrowser,
  );

  private readonly starsResource = httpResource<{ stargazers_count: number }>(
    () =>
      this.shouldLoad()
        ? 'https://api.github.com/repos/ng-icons/ng-icons'
        : undefined,
  );

  private readonly weeklyResource = httpResource<{ downloads: number }>(() =>
    this.shouldLoad() ? this.downloadsUrl('last-week') : undefined,
  );

  // One request per 18-month window, summed: four today, five from 2027.
  private readonly lifetimeResource = rxResource({
    params: () => (this.shouldLoad() ? true : undefined),
    stream: () =>
      forkJoin(lifetimeWindows().map(window => this.downloads(window))).pipe(
        map(points =>
          points.reduce((total, point) => total + point.downloads, 0),
        ),
      ),
  });

  readonly stars = computed(() =>
    this.starsResource.hasValue()
      ? compact(this.starsResource.value().stargazers_count)
      : '586',
  );
  readonly weekly = computed(() =>
    this.weeklyResource.hasValue()
      ? compact(this.weeklyResource.value().downloads)
      : '108K',
  );
  readonly lifetime = computed(() =>
    this.lifetimeResource.hasValue()
      ? compact(this.lifetimeResource.value())
      : '5.0M',
  );

  load(): void {
    this.enabled.set(true);
  }

  private downloadsUrl(period: string): string {
    return `https://api.npmjs.org/downloads/point/${period}/@ng-icons/core`;
  }

  private downloads(period: string) {
    return this.http.get<{ downloads: number }>(this.downloadsUrl(period));
  }
}
