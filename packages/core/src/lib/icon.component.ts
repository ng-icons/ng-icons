import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
} from '@angular/core';
import { IconsToken } from './icon.token';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toUpperCamelCase } from './utils/format';

@Component({
  selector: 'ng-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** Define the name of the icon to display */
  @Input() set name(name: string) {
    name = toUpperCamelCase(name);

    // if there is no icon with this name warn the user as they probably forgot to import it
    if (!this.icons.hasOwnProperty(name)) {
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
  size: string = '1em';

  /** Define the stroke-width of the icon */
  @HostBinding('style.--ng-icon__stroke-width')
  @Input()
  strokeWidth?: string | number;

  /** Define the color of the icon */
  @HostBinding('style.color')
  @Input()
  color?: string;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly sanitizer: DomSanitizer,
    @Inject(IconsToken) private readonly icons: Record<string, string>,
  ) {}
}
