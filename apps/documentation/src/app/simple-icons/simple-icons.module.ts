import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/simple-icons';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleIconsRoutingModule } from './simple-icons-routing.module';
import { SimpleIconsComponent } from './simple-icons.component';

@NgModule({
  declarations: [SimpleIconsComponent],
  imports: [
    CommonModule,
    SimpleIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class SimpleIconsModule {}
