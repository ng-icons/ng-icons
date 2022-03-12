import { NgIconsModule } from '@ng-icons/core';
import * as iconset from '@ng-icons/cryptocurrency-icons';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptocurrencyIconsRoutingModule } from './cryptocurrency-icons-routing.module';
import { CryptocurrencyIconsComponent } from './cryptocurrency-icons.component';
@NgModule({
  declarations: [CryptocurrencyIconsComponent],
  imports: [
    CommonModule,
    CryptocurrencyIconsRoutingModule,
    SharedModule,
    NgIconsModule.withIcons(iconset),
  ],
})
export class CryptocurrencyIconsModule {}
