import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgIconComponent } from './icon.component';
import { IconService } from './icon.service';

/**
 * A barrel export of all directives for use in standalone apps
 */
export const NG_ICON_DIRECTIVES: Provider[] = [NgIconComponent];

@NgModule({
  imports: [NG_ICON_DIRECTIVES],
  exports: [NG_ICON_DIRECTIVES],
})
export class NgIconsModule {
  constructor(private readonly iconService: IconService) {
    if (Object.keys(this.iconService.icons).length === 0) {
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
    IconService.addIcons(icons);

    return { ngModule: NgIconsModule };
  }
}
