import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/iconoir';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconoirRoutingModule } from './iconoir-routing.module';
import { IconoirComponent } from './iconoir.component';
@NgModule({
  declarations: [IconoirComponent],
  imports: [
    CommonModule,
    IconoirRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class IconoirModule {}
