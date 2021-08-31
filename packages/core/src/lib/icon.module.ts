import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { Icons } from './icon.provider';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class NgIconsModule {
  constructor(@Optional() private readonly icons: Icons) {
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
          provide: Icons,
          useFactory: (parentIcons?: Record<string, string>) => {
            return new Icons({ ...icons, ...parentIcons });
          },
          deps: [[new Optional(), new SkipSelf(), Icons]],
        },
      ],
    };
  }
}
