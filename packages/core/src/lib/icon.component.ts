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

@Component({
  selector: 'ng-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** Define the name of the icon to display */
  @Input() set name(name: string) {
    name = this.toUpperCamelCase(name);

    // if there is no icon with this name warn the user as they probably forgot to import it
    if (!this.iconset.hasOwnProperty(name)) {
      console.warn(
        `No icon named ${name} was found. You may need to import it using the withIcons function.`,
      );
      return;
    }

    // insert the SVG into the template
    this.template = this.sanitizer.bypassSecurityTrustHtml(this.iconset[name]);
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

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly sanitizer: DomSanitizer,
    @Inject(IconsToken) private readonly iconset: Record<string, string>,
  ) {}

  /**
   * Hyphenated to UpperCamelCase
   */
  private toUpperCamelCase(str: string): string {
    return this.toCapitalCase(this.toPropertyName(str));
  }

  /**
   * Hyphenated to lowerCamelCase
   */
  private toPropertyName(str: string): string {
    return str
      .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
        chr ? chr.toUpperCase() : '',
      )
      .replace(/[^a-zA-Z\d]/g, '')
      .replace(/^([A-Z])/, m => m.toLowerCase());
  }

  /**
   * Capitalizes the first letter of a string
   */
  private toCapitalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
}
