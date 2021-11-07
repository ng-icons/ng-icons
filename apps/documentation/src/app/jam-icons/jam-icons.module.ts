import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JamIconsRoutingModule } from './jam-icons-routing.module';
import { JamIconsComponent } from './jam-icons.component';
import { NgIconsModule } from '@ng-icons/core';
import * as jamIcons from '@ng-icons/jam-icons';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '@angular/cdk-experimental/dialog';

@NgModule({
  declarations: [JamIconsComponent],
  imports: [
    CommonModule,
    JamIconsRoutingModule,
    NgIconsModule.withIcons(jamIcons),
    SharedModule,
    DialogModule,
  ],
})
export class JamIconsModule {}
