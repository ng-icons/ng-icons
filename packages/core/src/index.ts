export * from './lib/components/glyph/glyph.component';
export * from './lib/components/icon/icon-name';
export * from './lib/components/icon/icon.component';
export * from './lib/icon.module';
export * from './lib/providers/glyph-config.provider';
export {
  NgGlyphs,
  NgGlyphset,
  provideNgGlyphs,
} from './lib/providers/glyph.provider';
export * from './lib/providers/icon-config.provider';
export * from './lib/providers/icon-loader.provider';
export * from './lib/providers/icon.provider';
export { withContentSecurityPolicy } from './lib/providers/features/csp';
export { withExceptionLogger } from './lib/providers/features/logger';

// re-export the component as NgIconComponent to prevent breaking changes
export { NgIcon as NgIconComponent } from './lib/components/icon/icon.component';
