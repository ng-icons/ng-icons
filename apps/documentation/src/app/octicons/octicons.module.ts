import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcticonsRoutingModule } from './octicons-routing.module';
import { OcticonsComponent } from './octicons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as smallOctIcons from '@ng-icons/octicons';
import * as largeOctIcons from '@ng-icons/octicons/large';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OcticonsComponent],
  imports: [
    CommonModule,
    OcticonsRoutingModule,
    NgIconsModule.withIcons({ ...smallOctIcons, ...largeOctIcons }),
    SharedModule,
  ],
})
export class OcticonsModule {}
