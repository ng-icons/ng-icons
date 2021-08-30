import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { Icons } from './icon.provider';

@Component({
  selector: 'ng-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'size',
    '[style.height]': 'size',
  },
})
export class IconComponent {
  /** Define the name of the icon to display */
  @Input() set name(name: string) {
    debugger;
    name = this.toUpperCamelCase(name);

    // if there is no icon with this name warn the user as they probably forgot to import it
    if (!this.icons.hasOwnProperty(name)) {
      console.warn(
        `No icon named ${name} was found. You may need to import it using the withIcons function.`,
      );
      return;
    }

    // insert the SVG into the template
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.icons.icons[name],
    );
  }

  /** Define the size of the icon */
  @Input() set size(size: string) {
    this._size = coerceCssPixelValue(size);
  }

  get size(): string {
    return this._size;
  }

  private _size: string = '1em';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly icons: Icons,
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
