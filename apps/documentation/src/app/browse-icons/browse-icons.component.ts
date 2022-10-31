import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { akarRadish } from '@ng-icons/akar-icons';
import { bootstrapBootstrapFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { cryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { cssShapeHexagon } from '@ng-icons/css.gg';
import { dripFlag } from '@ng-icons/dripicons';
import { featherFeather, featherShield } from '@ng-icons/feather-icons';
import { iconoirIconoir } from '@ng-icons/iconoir';
import { ionLogoIonic } from '@ng-icons/ionicons';
import { jamGlassFilled } from '@ng-icons/jam-icons';
import { octMarkGithub } from '@ng-icons/octicons';
import { radixModulzLogo } from '@ng-icons/radix-icons';
import { simpleSimpleicons } from '@ng-icons/simple-icons';
import { tablerBrandGoogle, tablerTools } from '@ng-icons/tabler-icons';
import { typInfinityOutline } from '@ng-icons/typicons';
import { aspectsDashboard } from '@ng-icons/ux-aspects';
import { FadeInContainerDirective } from '../directives/fade-in/fade-in-container.directive';
import { FadeInDirective } from '../directives/fade-in/fade-in.directive';

const circumIcon = `
<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.47 35.47"><path d="M17.74,0A17.74,17.74,0,1,0,35.47,17.74,17.72,17.72,0,0,0,17.74,0ZM21.5,28A10.27,10.27,0,1,1,31.77,17.74,10.26,10.26,0,0,1,21.5,28Z"></path></svg>`;

@Component({
  selector: 'app-browse-icons',
  templateUrl: './browse-icons.component.html',
  styleUrls: ['./browse-icons.component.scss'],
  standalone: true,
  imports: [NgFor, NgIconComponent, FadeInContainerDirective, FadeInDirective],
  providers: [
    provideIcons({
      bootstrapBootstrapFill,
      featherShield,
      ionLogoIonic,
      featherFeather,
      tablerBrandGoogle,
      cssShapeHexagon,
      jamGlassFilled,
      octMarkGithub,
      radixModulzLogo,
      tablerTools,
      akarRadish,
      iconoirIconoir,
      cryptoBtc,
      simpleSimpleicons,
      typInfinityOutline,
      dripFlag,
      aspectsDashboard,
      circumIcon,
    }),
  ],
})
export class BrowseIconsComponent {
  year = new Date().getFullYear();
  iconsets = [
    {
      name: 'Bootstrap Icons',
      website: 'https://icons.getbootstrap.com/',
      icon: 'bootstrapBootstrapFill',
      license: 'MIT',
      icons: () => import('@ng-icons/bootstrap-icons'),
    },
    {
      name: 'Heroicons',
      website: 'https://heroicons.com/',
      icon: 'featherShield',
      license: 'MIT',
      icons: () => import('@ng-icons/heroicons/outline'),
    },
    {
      name: 'Ionicons',
      website: 'https://ionic.io/ionicons',
      icon: 'ionLogoIonic',
      license: 'MIT',
      icons: () => import('@ng-icons/ionicons'),
    },
    {
      name: 'Material Icons',
      website: 'https://fonts.google.com/icons?selected=Material+Icons',
      icon: 'tablerBrandGoogle',
      license: 'MIT',
      icons: () => import('@ng-icons/material-icons'),
    },
    {
      name: 'CSS.gg',
      website: 'https://css.gg/',
      icon: 'cssShapeHexagon',
      license: 'MIT',
      icons: () => import('@ng-icons/css.gg'),
    },
    {
      name: 'Feather Icons',
      website: 'https://feathericons.com/',
      icon: 'featherFeather',
      license: 'MIT',
      icons: () => import('@ng-icons/feather-icons'),
    },
    {
      name: 'Jam Icons',
      website: 'https://jam-icons.com/',
      icon: 'jamGlassFilled',
      license: 'MIT',
      icons: () => import('@ng-icons/jam-icons'),
    },
    {
      name: 'Octicons',
      website: 'https://github.com/primer/octicons',
      icon: 'octMarkGithub',
      license: 'MIT',
      icons: () => import('@ng-icons/octicons'),
    },
    {
      name: 'Radix UI',
      website: 'https://icons.modulz.app/',
      icon: 'radixModulzLogo',
      license: 'MIT',
      icons: () => import('@ng-icons/radix-icons'),
    },
    {
      name: 'Tabler Icons',
      website: 'https://tabler-icons.io/',
      icon: 'tablerTools',
      license: 'MIT',
      icons: () => import('@ng-icons/tabler-icons'),
    },
    {
      name: 'Akar Icons',
      website: 'https://akaricons.com/',
      icon: 'akarRadish',
      license: 'MIT',
      icons: () => import('@ng-icons/akar-icons'),
    },
    {
      name: 'Iconoir',
      website: 'https://iconoir.com/',
      icon: 'iconoirIconoir',
      license: 'MIT',
      icons: () => import('@ng-icons/iconoir'),
    },
    {
      name: 'Cryptocurrency',
      website: 'http://cryptoicons.co/',
      icon: 'cryptoBtc',
      license: 'MIT',
      icons: () => import('@ng-icons/cryptocurrency-icons'),
    },
    {
      name: 'Simple Icons',
      website: 'https://simpleicons.org/',
      icon: 'simpleSimpleicons',
      license: 'MIT',
      icons: () => import('@ng-icons/simple-icons'),
    },
    {
      name: 'Typicons',
      website: 'https://www.s-ings.com/typicons/',
      license: 'MIT',
      icon: 'typInfinityOutline',
      icons: () => import('@ng-icons/typicons'),
    },
    {
      name: 'Dripicons',
      website: 'https://github.com/amitjakhu/dripicons',
      icon: 'dripFlag',
      license: 'MIT',
      icons: () => import('@ng-icons/dripicons'),
    },
    {
      name: 'UX Aspects',
      website: 'https://uxaspects.github.io/UXAspects/',
      icon: 'aspectsDashboard',
      license: 'MIT',
      icons: () => import('@ng-icons/ux-aspects'),
    },
    {
      name: 'Circum Icons',
      website: 'https://circumicons.com/',
      icon: 'circumIcon',
      license: 'MIT',
      icons: () => import('@ng-icons/circum-icons'),
    },
  ];
}
