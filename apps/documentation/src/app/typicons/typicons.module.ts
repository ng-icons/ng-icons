import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/typicons';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypiconsRoutingModule } from './typicons-routing.module';
import { TypiconsComponent } from './typicons.component';
@NgModule({
  declarations: [TypiconsComponent],
  imports: [
    CommonModule,
    TypiconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class TypiconsModule {}
