import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CssGgRoutingModule } from './css-gg-routing.module';
import { CssGgComponent } from './css-gg.component';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import * as cssGgIcons from '@ng-icons/css.gg';

@NgModule({
  declarations: [CssGgComponent],
  imports: [
    CommonModule,
    CssGgRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(cssGgIcons),
  ],
})
export class CssGgModule {}
