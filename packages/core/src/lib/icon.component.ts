import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { IconName } from './icon-name';
import { injectNgIconConfig } from './providers/icon-config.provider';
import { injectNgIcons } from './providers/icon.provider';
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

  /** Define the name of the icon to display */
  @Input() set name(name: IconType) {
    name = toPropertyName(name);

    for (const icons of [...this.icons].reverse()) {
      if (icons[name]) {
        // insert the SVG into the template
        this.template = this.sanitizer.bypassSecurityTrustHtml(icons[name]);
        return;
      }
    }

    // if there is no icon with this name warn the user as they probably forgot to import it
    console.warn(
      `No icon named ${name} was found. You may need to import it using the withIcons function.`,
    );
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
  color?: string;
}

function coerceCssPixelValue(value: string): string {
  return value == null ? '' : /^\d+$/.test(value) ? `${value}px` : value;
}
