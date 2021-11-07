import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedComponent,
  },
  {
    path: 'heroicons',
    loadChildren: () =>
      import('./heroicons/heroicons.module').then(m => m.HeroiconsModule),
  },
  {
    path: 'feather-icons',
    loadChildren: () =>
      import('./feather-icons/feather-icons.module').then(
        m => m.FeatherIconsModule,
      ),
  },
  {
    path: 'jam-icons',
    loadChildren: () =>
      import('./jam-icons/jam-icons.module').then(m => m.JamIconsModule),
  },
  {
    path: 'radix-icons',
    loadChildren: () =>
      import('./radix-icons/radix-icons.module').then(m => m.RadixIconsModule),
  },
  {
    path: 'tabler-icons',
    loadChildren: () =>
      import('./tabler-icons/tabler-icons.module').then(
        m => m.TablerIconsModule,
      ),
  },
  {
    path: 'octicons',
    loadChildren: () =>
      import('./octicons/octicons.module').then(m => m.OcticonsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
