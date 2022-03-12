import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialIconsRoutingModule } from './material-icons-routing.module';
import { MaterialIconsComponent } from './material-icons.component';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import * as baselineMaterialIcons from '@ng-icons/material-icons/baseline';
import * as outlineMaterialIcons from '@ng-icons/material-icons/outline';
import * as roundMaterialIcons from '@ng-icons/material-icons/round';
import * as sharpMaterialIcons from '@ng-icons/material-icons/sharp';

@NgModule({
  declarations: [MaterialIconsComponent],
  imports: [
    CommonModule,
    MaterialIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({
      ...baselineMaterialIcons,
      ...outlineMaterialIcons,
      ...roundMaterialIcons,
      ...sharpMaterialIcons,
    }),
  ],
})
export class MaterialIconsModule {}
