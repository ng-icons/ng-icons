import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroiconsRoutingModule } from './heroicons-routing.module';
import { HeroiconsComponent } from './heroicons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as solidHeroIcons from '@ng-icons/heroicons/solid';
import * as outlineHeroIcons from '@ng-icons/heroicons/outline';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '@angular/cdk-experimental/dialog';

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
