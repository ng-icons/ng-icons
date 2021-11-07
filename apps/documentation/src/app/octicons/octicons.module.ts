import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcticonsRoutingModule } from './octicons-routing.module';
import { OcticonsComponent } from './octicons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as octIcons from '@ng-icons/octicons';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '@angular/cdk-experimental/dialog';

@NgModule({
  declarations: [OcticonsComponent],
  imports: [
    CommonModule,
    OcticonsRoutingModule,
    NgIconsModule.withIcons(octIcons),
    SharedModule,
    DialogModule,
  ],
})
export class OcticonsModule {}
