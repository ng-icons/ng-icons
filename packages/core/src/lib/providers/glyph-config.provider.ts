import { InjectionToken, Provider, inject } from '@angular/core';

export interface NgGlyphConfig {
  /** Define the default size of glyph */
  size: string | number;
  /** Define the optical size of the glyph */
  opticalSize?: number;
  /** Define the default color of glyph */
  color?: string;
  /** Define the default weight of glyph */
  weight?: number;
  /** Define the default grade of glyph */
  grade?: number;
  /** Define the default fill of glyph */
  fill?: boolean;
}

export const NgGlyphConfigToken = new InjectionToken<Required<NgGlyphConfig>>(
  'Ng Glyph Config',
);

const defaultConfig: NgGlyphConfig = {
  size: '1em',
  opticalSize: 20,
  weight: 400,
  grade: 0,
  fill: false,
};

/**
 * Provide the configuration for the glyph
 * @param config The configuration to use
 */
export function provideNgGlyphsConfig(
  config: Partial<NgGlyphConfig>,
): Provider {
  return {
    provide: NgGlyphConfigToken,
    useValue: { ...defaultConfig, ...config },
  };
}

/**
 * Inject the configuration for the glyphs
 * @returns The configuration to use
 * @internal
 */
export function injectNgGlyphsConfig(): Required<NgGlyphConfig> {
  return (inject(NgGlyphConfigToken, { optional: true }) ??
    defaultConfig) as Required<NgGlyphConfig>;
}
