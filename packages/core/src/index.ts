export * from './lib/icon-name';
export * from './lib/icon.component';
export * from './lib/icon.module';
export * from './lib/providers/icon-config.provider';
export * from './lib/providers/icon-loader.provider';
export * from './lib/providers/icon.provider';

// re-export the component as NgIconComponent to prevent breaking changes
export { NgIcon as NgIconComponent } from './lib/icon.component';
