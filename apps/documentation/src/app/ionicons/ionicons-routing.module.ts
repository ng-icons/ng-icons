import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IoniconsComponent } from './ionicons.component';

const routes: Routes = [{ path: '', component: IoniconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IoniconsRoutingModule {}
