import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapIconsRoutingModule } from './bootstrap-icons-routing.module';
import { BootstrapIconsComponent } from './bootstrap-icons.component';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@NgModule({
  declarations: [BootstrapIconsComponent],
  imports: [
    CommonModule,
    BootstrapIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(bootstrapIcons),
  ],
})
export class BootstrapIconsModule {}
