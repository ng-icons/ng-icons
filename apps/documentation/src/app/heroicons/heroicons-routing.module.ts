import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroiconsComponent } from './heroicons.component';

const routes: Routes = [{ path: '', component: HeroiconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroiconsRoutingModule { }
