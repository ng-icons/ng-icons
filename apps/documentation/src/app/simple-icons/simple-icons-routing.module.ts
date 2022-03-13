import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleIconsComponent } from './simple-icons.component';

const routes: Routes = [{ path: '', component: SimpleIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleIconsRoutingModule {}
