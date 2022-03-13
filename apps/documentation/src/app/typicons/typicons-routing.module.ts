import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypiconsComponent } from './typicons.component';

const routes: Routes = [{ path: '', component: TypiconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypiconsRoutingModule {}
