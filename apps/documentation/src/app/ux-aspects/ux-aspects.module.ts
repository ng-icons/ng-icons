import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/ux-aspects';
import { SharedModule } from '../shared/shared.module';
import { UxAspectsRoutingModule } from './ux-aspects-routing.module';
import { UxAspectsComponent } from './ux-aspects.component';

@NgModule({
  declarations: [UxAspectsComponent],
  imports: [
    CommonModule,
    UxAspectsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class UxAspectsModule {}
