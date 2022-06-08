import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import * as outlineHeroIcons from '@ng-icons/heroicons/outline';
import * as solidHeroIcons from '@ng-icons/heroicons/solid';
import { SharedModule } from '../shared/shared.module';
import { HeroiconsRoutingModule } from './heroicons-routing.module';
import { HeroiconsComponent } from './heroicons.component';

@NgModule({
  declarations: [HeroiconsComponent],
  imports: [
    CommonModule,
    HeroiconsRoutingModule,
    NgIconsModule.withIcons({ ...solidHeroIcons, ...outlineHeroIcons }),
    SharedModule,
    DialogModule,
  ],
})
export class HeroiconsModule {}
