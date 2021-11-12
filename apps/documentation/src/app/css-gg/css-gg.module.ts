import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CssGgRoutingModule } from './css-gg-routing.module';
import { CssGgComponent } from './css-gg.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '@angular/cdk-experimental/dialog';

@NgModule({
  declarations: [CssGgComponent],
  imports: [CommonModule, CssGgRoutingModule, SharedModule, DialogModule],
})
export class CssGgModule {}
