import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/dripicons';
import { SharedModule } from '../shared/shared.module';
import { DripiconsRoutingModule } from './dripicons-routing.module';
import { DripiconsComponent } from './dripicons.component';

@NgModule({
  declarations: [DripiconsComponent],
  imports: [
    CommonModule,
    DripiconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class DripiconsModule {}
