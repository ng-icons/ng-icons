import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircumIconsComponent } from './circum-icons.component';

const routes: Routes = [{ path: '', component: CircumIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircumIconsRoutingModule {}
