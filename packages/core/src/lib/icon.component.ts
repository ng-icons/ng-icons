import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconName } from './icon-name';
import { NgIconsToken } from './icon.provider';
import { toPropertyName } from './utils/format';

@Component({
  selector: 'ng-icon',
  template: '',
  standalone: true,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgIconComponent {
  /** Define the name of the icon to display */
  @Input() set name(name: IconName | string) {
    name = toPropertyName(name);

    // if there is no icon with this name warn the user as they probably forgot to import it
    if (!this.icons[name]) {
      console.warn(
        `No icon named ${name} was found. You may need to import it using the withIcons function.`,
      );
      return;
    }

    // insert the SVG into the template
    this.template = this.sanitizer.bypassSecurityTrustHtml(this.icons[name]);
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

  private _size: string = '1em';

  /** Define the stroke-width of the icon */
  @HostBinding('style.--ng-icon__stroke-width')
  @Input()
  strokeWidth?: string | number;

  /** Define the color of the icon */
  @HostBinding('style.color')
  @Input()
  color?: string;

  constructor(
    private readonly sanitizer: DomSanitizer,
    @Inject(NgIconsToken) private readonly icons: Record<string, string>,
  ) {}
}

function coerceCssPixelValue(value: string): string {
  return value == null ? '' : /^\d+$/.test(value) ? `${value}px` : value;
}
