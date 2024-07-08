import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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
  host: {
    '[class]': 'glyphsetClass()',
    '[textContent]': 'name()',
    '[style.--ng-glyph__size]': 'size()',
    '[style.color]': 'color()',
    '[style.font-variation-settings]': 'fontVariationSettings()'
  }
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
  readonly name = input.required<string>();

  /**
   * Define the glyphset to use
   */
  readonly glyphset = input(this.glyphsets.defaultGlyphset);

  /**
   * Define the optical size of the glyph
   */
  readonly opticalSize = input(this.config.opticalSize, { transform: numberAttribute });

  /**
   * Define the weight of the glyph
   */
  readonly weight = input(this.config.weight, { transform: numberAttribute });

  /**
   * Define the grade of the glyph
   */
  readonly grade = input(this.config.grade, { transform: numberAttribute });

  /**
   * Define the fill of the glyph
   */
  readonly fill = input(this.config.fill, { transform: booleanAttribute });

  /**
   * Define the size of the glyph
   */
  readonly size = input(this.config.size, { transform: coerceCssPixelValue });

  /**
   * Define the color of the glyph
   */
  readonly color = input(this.config.color);

  /**
   * Derive the glyphset class from the glyphset name
   */
  readonly glyphsetClass = computed(() => {
    const glyphset = this.glyphsets.glyphsets.find(
      glyphset => glyphset.name === this.glyphset(),
    );

    if (!glyphset) {
      throw new Error(
        `The glyphset "${this.glyphset()}" does not exist. Please provide a valid glyphset.`,
      );
    }

    return glyphset.baseClass;
  });

  /**
   * Define the font variation settings of the glyph
   */
  readonly fontVariationSettings = computed(() => {
    return `'FILL' ${this.fill() ? 1 : 0}, 'wght' ${this.weight()}, 'GRAD' ${
      this.grade()
    }, 'opsz' ${this.opticalSize()}`;
  });
}
