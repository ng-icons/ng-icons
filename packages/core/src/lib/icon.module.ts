import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { NgIcon } from './components/icon/icon.component';
import { NgIconsToken, provideIcons } from './providers/icon.provider';

@NgModule({
  imports: [NgIcon],
  exports: [NgIcon],
})
export class NgIconsModule {
  constructor(@Inject(NgIconsToken) icons: Record<string, string>) {
    if (Object.keys(icons).length === 0) {
      throw new Error(
        'No icons have been provided. Ensure to include some icons by importing them using NgIconsModule.withIcons({ ... }).',
      );
    }
  }

  /**
   * Define the icons that will be included in the application. This allows unused icons to
   * be tree-shaken away to reduce bundle size
   * @param icons The object containing the required icons
   */
  static withIcons(
    icons: Record<string, string>,
  ): ModuleWithProviders<NgIconsModule> {
    return { ngModule: NgIconsModule, providers: provideIcons(icons) };
  }
}

export const NG_ICON_DIRECTIVES = [NgIcon] as const;
