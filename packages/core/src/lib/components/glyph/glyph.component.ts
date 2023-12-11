import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { injectNgGlyphsConfig } from '../../providers/glyph-config.provider';
import { injectNgGlyphs } from '../../providers/glyph.provider';
import { coerceCssPixelValue } from '../../utils/coercion';

@Component({
  selector: 'ng-glyph',
  standalone: true,
  template: ``,
  styleUrl: './glyph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgGlyph {
  /**
   * Access the available glyphsets
   */
  private readonly glyphsets = injectNgGlyphs();

  /**
   * Access the default configuration
   */
  private readonly config = injectNgGlyphsConfig();

  /**
   * Define the name of the glyph to display
   */
  @HostBinding('textContent')
  @Input({ required: true })
  name!: string;

  /**
   * Define the glyphset to use
   */
  @Input()
  glyphset: string = this.glyphsets.defaultGlyphset;

  /**
   * Define the optical size of the glyph
   */
  @Input({ transform: numberAttribute }) opticalSize: number =
    this.config.opticalSize;

  /**
   * Define the weight of the glyph
   */
  @Input({ transform: numberAttribute }) weight: number = this.config.weight;

  /**
   * Define the grade of the glyph
   */
  @Input({ transform: numberAttribute }) grade: number = this.config.grade;

  /**
   * Define the fill of the glyph
   */
  @Input({ transform: booleanAttribute }) fill: boolean = this.config.fill;

  /**
   * Define the size of the glyph
   */
  @HostBinding('style.--ng-glyph__size')
  @Input({ transform: coerceCssPixelValue })
  size?: string | number = this.config.size;

  /**
   * Define the color of the glyph
   */
  @HostBinding('style.color')
  @Input()
  color?: string = this.config.color;

  /**
   * Derive the glyphset class from the glyphset name
   */
  @HostBinding('class')
  get glyphsetClass(): string {
    const glyphset = this.glyphsets.glyphsets.find(
      glyphset => glyphset.name === this.glyphset,
    );

    if (!glyphset) {
      throw new Error(
        `The glyphset "${this.glyphset}" does not exist. Please provide a valid glyphset.`,
      );
    }

    return glyphset.baseClass;
  }

  /**
   * Define the font variation settings of the glyph
   */
  @HostBinding('style.font-variation-settings')
  get fontVariationSettings(): string {
    return `'FILL' ${this.fill ? 1 : 0}, 'wght' ${this.weight}, 'GRAD' ${
      this.grade
    }, 'opsz' ${this.opticalSize}`;
  }
}
