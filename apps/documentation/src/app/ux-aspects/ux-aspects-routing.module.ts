import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UxAspectsComponent } from './ux-aspects.component';

const routes: Routes = [{ path: '', component: UxAspectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UxAspectsRoutingModule {}
