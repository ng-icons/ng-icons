import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AkarIconsComponent } from './akar-icons.component';

const routes: Routes = [{ path: '', component: AkarIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkarIconsRoutingModule {}
