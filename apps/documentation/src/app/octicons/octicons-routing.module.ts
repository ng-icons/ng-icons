import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcticonsComponent } from './octicons.component';

const routes: Routes = [{ path: '', component: OcticonsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcticonsRoutingModule { }
