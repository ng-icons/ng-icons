import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadixIconsRoutingModule } from './radix-icons-routing.module';
import { RadixIconsComponent } from './radix-icons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as radixIcons from '@ng-icons/radix-icons';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RadixIconsComponent],
  imports: [
    CommonModule,
    RadixIconsRoutingModule,
    NgIconsModule.withIcons(radixIcons),
    SharedModule,
  ],
})
export class RadixIconsModule {}
