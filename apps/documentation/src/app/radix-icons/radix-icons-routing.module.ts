import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadixIconsComponent } from './radix-icons.component';

const routes: Routes = [{ path: '', component: RadixIconsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadixIconsRoutingModule { }
