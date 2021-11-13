import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapIconsComponent } from './bootstrap-icons.component';

const routes: Routes = [{ path: '', component: BootstrapIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BootstrapIconsRoutingModule {}
