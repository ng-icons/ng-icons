import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablerIconsComponent } from './tabler-icons.component';

const routes: Routes = [{ path: '', component: TablerIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablerIconsRoutingModule { }
