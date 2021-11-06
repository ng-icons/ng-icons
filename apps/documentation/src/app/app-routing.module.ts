import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroicons',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
