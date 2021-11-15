import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialIconsRoutingModule } from './material-icons-routing.module';
import { MaterialIconsComponent } from './material-icons.component';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import * as materialIcons from '@ng-icons/material-icons';

@NgModule({
  declarations: [MaterialIconsComponent],
  imports: [
    CommonModule,
    MaterialIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(materialIcons),
  ],
})
export class MaterialIconsModule {}
