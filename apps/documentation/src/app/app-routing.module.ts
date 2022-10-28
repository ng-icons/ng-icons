import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'getting-started',
    loadComponent: () =>
      import('./getting-started/getting-started.component').then(
        m => m.GettingStartedComponent,
      ),
  },
  {
    path: 'browse-icons',
    loadComponent: () =>
      import('./browse-icons/browse-icons.component').then(
        m => m.BrowseIconsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
