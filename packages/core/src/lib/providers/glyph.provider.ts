import { InjectionToken, ValueProvider, inject } from '@angular/core';

export const NgGlyphsToken = new InjectionToken<NgGlyphs>('NgGlyphsToken');

export function provideNgGlyphs(...glyphsets: NgGlyphset[]): ValueProvider[] {
  // if there are no glyphsets, throw an error
  if (!glyphsets.length) {
    throw new Error('Please provide at least one glyphset.');
  }

  // the default glyphset is the first one
  const defaultGlyphset = glyphsets[0].name;

  return [{ provide: NgGlyphsToken, useValue: { defaultGlyphset, glyphsets } }];
}

export function injectNgGlyphs(): NgGlyphs {
  const glyphs = inject(NgGlyphsToken, { optional: true });

  if (!glyphs) {
    throw new Error(
      'Please provide the glyphs using the provideNgGlyphs() function.',
    );
  }

  return glyphs;
}

export interface NgGlyphset {
  name: string;
  baseClass: string;
}

export interface NgGlyphs {
  defaultGlyphset: string;
  glyphsets: NgGlyphset[];
}
