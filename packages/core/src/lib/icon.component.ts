import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Injector,
  Input,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { IconName } from './icon-name';
import { injectNgIconConfig } from './providers/icon-config.provider';
import { injectNgIconLoader } from './providers/icon-loader.provider';
import { injectNgIcons } from './providers/icon.provider';
import { coerceLoaderResult } from './utils/async';
import { toPropertyName } from './utils/format';

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

  /** Access the sanitizer */
  private readonly sanitizer = inject(DomSanitizer);

  /** Access the icons */
  private readonly icons = injectNgIcons();

  /** Access the icon loader if defined */
  private readonly loader = injectNgIconLoader();

  /** Access the injector */
  private readonly injector = inject(Injector);

  /** Access the change detector */
  private readonly changeDetector = inject(ChangeDetectorRef);

  /** Define the name of the icon to display */
  @Input() set name(name: IconType) {
    this.setIcon(name);
  }

  /** Store the formatted icon name */
  @HostBinding('innerHTML') template?: SafeHtml;

  /** Define the size of the icon */
  @HostBinding('style.--ng-icon__size')
  @Input()
  set size(size: string) {
    // if the size only contains numbers, assume it is in pixels
    this._size = coerceCssPixelValue(size);
  }

  get size(): string {
    return this._size;
  }

  private _size: string = this.config.size;

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
        this.template = this.sanitizer.bypassSecurityTrustHtml(
          icons[propertyName],
        );
        return;
      }
    }

    // if there is a loader defined, use it to load the icon
    if (this.loader) {
      const result = await this.requestIconFromLoader(name);

      // if the result is a string, insert the SVG into the template
      if (result !== null) {
        this.template = this.sanitizer.bypassSecurityTrustHtml(result);

        // run change detection as this operation is asynchronous
        this.changeDetector.detectChanges();
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
        const result = await coerceLoaderResult(this.loader!(name));
        resolve(result);
      });
    });
  }
}

function coerceCssPixelValue(value: string): string {
  return value == null ? '' : /^\d+$/.test(value) ? `${value}px` : value;
}
