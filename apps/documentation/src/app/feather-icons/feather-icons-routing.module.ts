import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatherIconsComponent } from './feather-icons.component';

const routes: Routes = [{ path: '', component: FeatherIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatherIconsRoutingModule { }
