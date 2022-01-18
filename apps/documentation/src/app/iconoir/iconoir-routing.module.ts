import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconoirComponent } from './iconoir.component';

const routes: Routes = [{ path: '', component: IconoirComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconoirRoutingModule {}
