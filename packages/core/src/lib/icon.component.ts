import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { IconsToken } from './icon.token';

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
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.iconset[name],
    );
  }

  /** Define the size of the icon */
  @HostBinding('style.--ng-icon__size')
  @Input()
  size: string = '1em';

  /** Define the stroke-width of the icon */
  @HostBinding('style.--ng-icon__stroke-width')
  @Input()
  strokeWidth?: string | number;

  /** Flatten the iconsets */
  get iconset(): Record<string, string> {
    return Object.assign({}, ...this.icons);
  }

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(IconsToken) private readonly icons: Record<string, string>[],
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
