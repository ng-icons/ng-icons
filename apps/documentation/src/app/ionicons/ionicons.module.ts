import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ionicons from '@ng-icons/ionicons';
import { IoniconsRoutingModule } from './ionicons-routing.module';
import { IoniconsComponent } from './ionicons.component';
import { NgIconsModule } from '@ng-icons/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [IoniconsComponent],
  imports: [
    CommonModule,
    IoniconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(ionicons),
  ],
})
export class IoniconsModule {}
