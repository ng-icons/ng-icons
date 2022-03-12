import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptocurrencyIconsComponent } from './cryptocurrency-icons.component';

const routes: Routes = [{ path: '', component: CryptocurrencyIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptocurrencyIconsRoutingModule {}
