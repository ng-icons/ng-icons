import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroiconsRoutingModule } from './heroicons-routing.module';
import { HeroiconsComponent } from './heroicons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as heroIcons from '@ng-icons/heroicons';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeroiconsComponent],
  imports: [
    CommonModule,
    HeroiconsRoutingModule,
    NgIconsModule.withIcons(heroIcons),
    SharedModule,
  ],
})
export class HeroiconsModule {}
