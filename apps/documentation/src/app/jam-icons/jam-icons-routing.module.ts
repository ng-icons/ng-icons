import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JamIconsComponent } from './jam-icons.component';

const routes: Routes = [{ path: '', component: JamIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JamIconsRoutingModule { }
