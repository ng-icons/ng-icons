import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CssGgRoutingModule } from './css-gg-routing.module';
import { CssGgComponent } from './css-gg.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CssGgComponent],
  imports: [CommonModule, CssGgRoutingModule, SharedModule],
})
export class CssGgModule {}
