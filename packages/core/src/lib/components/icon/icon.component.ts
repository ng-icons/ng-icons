import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Injector,
  Input,
  runInInjectionContext,
} from '@angular/core';
import type { IconName } from '../../components/icon/icon-name';
import { injectNgIconConfig } from '../../providers/icon-config.provider';
import {
  injectNgIconLoader,
  injectNgIconLoaderCache,
} from '../../providers/icon-loader.provider';
import { injectNgIcons } from '../../providers/icon.provider';
import { coerceLoaderResult } from '../../utils/async';
import { coerceCssPixelValue } from '../../utils/coercion';
import { toPropertyName } from '../../utils/format';

// This is a typescript type to prevent inference from collapsing the union type to a string to improve type safety
// eslint-disable-next-line @typescript-eslint/ban-types
export type IconType = IconName | (string & {});

@Component({
  selector: 'ng-icon',
  template: '',
  standalone: true,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgIcon {
  /** Access the global icon config */
  private readonly config = injectNgIconConfig();

  /** Access the icons */
  private readonly icons = injectNgIcons();

  /** Access the icon loader if defined */
  private readonly loader = injectNgIconLoader();

  /** Access the icon cache if defined */
  private readonly cache = injectNgIconLoaderCache();

  /** Access the injector */
  private readonly injector = inject(Injector);

  /** Access the element ref */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Define the name of the icon to display */
  @Input() set name(name: IconType) {
    this.setIcon(name);
  }

  /** Define the size of the icon */
  @HostBinding('style.--ng-icon__size')
  @Input({ transform: coerceCssPixelValue })
  size?: string | number = this.config.size;

  /** Define the stroke-width of the icon */
  @HostBinding('style.--ng-icon__stroke-width')
  @Input()
  strokeWidth?: string | number;

  /** Define the color of the icon */
  @HostBinding('style.color')
  @Input()
  color?: string = this.config.color;

  /**
   * Load the icon with the given name and insert it into the template.
   * @param name The name of the icon to load.
   */
  private async setIcon(name: IconType): Promise<void> {
    const propertyName = toPropertyName(name);

    for (const icons of [...this.icons].reverse()) {
      if (icons[propertyName]) {
        // insert the SVG into the template
        this.elementRef.nativeElement.innerHTML = icons[propertyName];
        return;
      }
    }

    // if there is a loader defined, use it to load the icon
    if (this.loader) {
      const result = await this.requestIconFromLoader(name);

      // if the result is a string, insert the SVG into the template
      if (result !== null) {
        this.elementRef.nativeElement.innerHTML = result;
        return;
      }
    }

    // if there is no icon with this name warn the user as they probably forgot to import it
    console.warn(
      `No icon named ${name} was found. You may need to import it using the withIcons function.`,
    );
  }

  /**
   * Request the icon from the loader.
   * @param name The name of the icon to load.
   * @returns The SVG content for a given icon name.
   */
  private requestIconFromLoader(name: string): Promise<string> {
    return new Promise(resolve => {
      runInInjectionContext(this.injector, async () => {
        // if we have a cache, check if the icon is already loaded (i.e, it is a string)
        if (this.cache) {
          const cachedResult = this.cache.get(name);

          if (typeof cachedResult === 'string') {
            resolve(cachedResult);
            return;
          }

          // it may be a promise, so we need to await it
          if (cachedResult instanceof Promise) {
            const result = await cachedResult;
            resolve(result);
            return;
          }
        }

        const promise = coerceLoaderResult(this.loader!(name));

        // store the promise in the cache so if we get repeated calls (e.g. in a loop) before the loader has resolved
        // then don't call the loader function multiple times
        this.cache?.set(name, promise);

        // await the result of the promise
        const result = await promise;

        // if we have a cache, store the result
        this.cache?.set(name, result);

        resolve(result);
      });
    });
  }
}
