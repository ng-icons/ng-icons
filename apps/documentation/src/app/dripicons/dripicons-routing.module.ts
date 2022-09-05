import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DripiconsComponent } from './dripicons.component';

const routes: Routes = [{ path: '', component: DripiconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DripiconsRoutingModule {}
