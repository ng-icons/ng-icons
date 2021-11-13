import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AkarIconsRoutingModule } from './akar-icons-routing.module';
import { AkarIconsComponent } from './akar-icons.component';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import * as akarIcons from '@ng-icons/akar-icons';

@NgModule({
  declarations: [AkarIconsComponent],
  imports: [
    CommonModule,
    AkarIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(akarIcons),
  ],
})
export class AkarIconsModule {}
