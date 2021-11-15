import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialIconsComponent } from './material-icons.component';

const routes: Routes = [{ path: '', component: MaterialIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIconsRoutingModule {}
