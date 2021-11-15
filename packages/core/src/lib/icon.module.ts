import {
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { IconsToken } from './icon.token';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class NgIconsModule {
  constructor(
    @Optional()
    @Inject(IconsToken)
    private readonly icons: Record<string, string>[],
  ) {
    if (!this.icons) {
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
    return {
      ngModule: NgIconsModule,
      providers: [
        {
          provide: IconsToken,
          useFactory: (existingIcons: Record<string, string> = {}) => ({
            ...existingIcons,
            ...icons,
          }),
          deps: [[new Optional(), new SkipSelf(), new Inject(IconsToken)]],
        },
      ],
    };
  }
}
