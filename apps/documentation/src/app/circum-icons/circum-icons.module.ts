import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as iconset from '@ng-icons/circum-icons';
import { NgIconsModule } from '@ng-icons/core';
import { SharedModule } from '../shared/shared.module';
import { CircumIconsRoutingModule } from './circum-icons-routing.module';
import { CircumIconsComponent } from './circum-icons.component';

@NgModule({
  declarations: [CircumIconsComponent],
  imports: [
    CommonModule,
    CircumIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class CircumIconsModule {}
