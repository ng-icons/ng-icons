import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as featherIcons from '@ng-icons/feather-icons';
import { FeatherIconsRoutingModule } from './feather-icons-routing.module';
import { FeatherIconsComponent } from './feather-icons.component';
import { NgIconsModule } from '@ng-icons/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeatherIconsComponent],
  imports: [
    CommonModule,
    FeatherIconsRoutingModule,
    NgIconsModule.withIcons(featherIcons),
    SharedModule,
  ],
})
export class FeatherIconsModule {}
