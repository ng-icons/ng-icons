import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CssGgComponent } from './css-gg.component';
import { NgIconsModule } from '@ng-icons/core';
import * as cssGgIcons from '@ng-icons/css.gg';

const routes: Routes = [{ path: '', component: CssGgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), NgIconsModule.withIcons(cssGgIcons)],
  exports: [RouterModule],
})
export class CssGgRoutingModule {}
