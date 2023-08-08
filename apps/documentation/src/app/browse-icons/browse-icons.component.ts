import { Clipboard } from '@angular/cdk/clipboard';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, Injector, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { akarRadish } from '@ng-icons/akar-icons';
import { bootstrapBootstrapFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, NgIconsToken, provideIcons } from '@ng-icons/core';
import { cryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { cssShapeHexagon } from '@ng-icons/css.gg';
import { dripFlag } from '@ng-icons/dripicons';
import { featherFeather, featherShield } from '@ng-icons/feather-icons';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { iconoirIconoir } from '@ng-icons/iconoir';
import { ionLogoIonic } from '@ng-icons/ionicons';
import { jamGlassFilled } from '@ng-icons/jam-icons';
import { matfDocumentUncolored } from '@ng-icons/material-file-icons/uncolored';
import { octMarkGithub } from '@ng-icons/octicons';
import { radixModulzLogo } from '@ng-icons/radix-icons';
import { remixRemixiconLine } from '@ng-icons/remixicon';
import { simpleSimpleicons } from '@ng-icons/simple-icons';
import { tablerBrandGoogle, tablerTools } from '@ng-icons/tabler-icons';
import { typInfinityOutline } from '@ng-icons/typicons';
import { aspectsDashboard } from '@ng-icons/ux-aspects';
import { ForModule } from '@rx-angular/template/for';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { SegmentComponent } from '../components/segment/segment.component';
import { FadeInContainerDirective } from '../directives/fade-in/fade-in-container.directive';
import { FadeInDirective } from '../directives/fade-in/fade-in.directive';

const circumIcon = `
<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.47 35.47"><path d="M17.74,0A17.74,17.74,0,1,0,35.47,17.74,17.72,17.72,0,0,0,17.74,0ZM21.5,28A10.27,10.27,0,1,1,31.77,17.74,10.26,10.26,0,0,1,21.5,28Z"></path></svg>`;

@Component({
  selector: 'app-browse-icons',
  templateUrl: './browse-icons.component.html',
  styleUrls: ['./browse-icons.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    KeyValuePipe,
    NgIconComponent,
    FadeInContainerDirective,
    FadeInDirective,
    FormsModule,
    AsyncPipe,
    SegmentComponent,
    ForModule,
  ],
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
      heroMagnifyingGlass,
      matfDocumentUncolored,
      remixRemixiconLine,
    }),
  ],
})
export class BrowseIconsComponent implements OnInit {
  year = new Date().getFullYear();

  private readonly injector = inject(Injector);

  private readonly clipboard = inject(Clipboard);

  iconsets: Iconset[] = [
    {
      name: 'Bootstrap Icons',
      website: 'icons.getbootstrap.com',
      icon: 'bootstrapBootstrapFill',
      license: 'MIT',
      package: '@ng-icons/bootstrap-icons',
      icons: async () => {
        return { default: await import('@ng-icons/bootstrap-icons') };
      },
    },
    {
      name: 'Heroicons',
      website: 'heroicons.com',
      icon: 'featherShield',
      license: 'MIT',
      package: '@ng-icons/heroicons/outline',
      icons: async () => {
        const [outline, solid, mini] = await Promise.all([
          import('@ng-icons/heroicons/outline'),
          import('@ng-icons/heroicons/solid'),
          import('@ng-icons/heroicons/mini'),
        ]);

        return { outline, solid, mini };
      },
    },
    {
      name: 'Ionicons',
      website: 'ionic.io/ionicons',
      icon: 'ionLogoIonic',
      license: 'MIT',
      package: '@ng-icons/ionicons',
      icons: async () => {
        return { default: await import('@ng-icons/ionicons') };
      },
    },
    {
      name: 'Material Icons',
      website: 'fonts.google.com/icons?selected=Material+Icons',
      icon: 'tablerBrandGoogle',
      license: 'Apache 2.0',
      package: '@ng-icons/material-icons/outline',
      icons: async () => {
        const [baseline, outline, round, sharp] = await Promise.all([
          import('@ng-icons/material-icons/baseline'),
          import('@ng-icons/material-icons/outline'),
          import('@ng-icons/material-icons/round'),
          import('@ng-icons/material-icons/sharp'),
        ]);

        return { baseline, outline, round, sharp };
      },
    },
    {
      name: 'CSS.gg',
      website: 'css.gg',
      icon: 'cssShapeHexagon',
      license: 'MIT',
      package: '@ng-icons/css.gg',
      icons: async () => {
        return { default: await import('@ng-icons/css.gg') };
      },
    },
    {
      name: 'Feather Icons',
      website: 'feathericons.com',
      icon: 'featherFeather',
      license: 'MIT',
      package: '@ng-icons/feather-icons',
      icons: async () => {
        return { default: await import('@ng-icons/feather-icons') };
      },
    },
    {
      name: 'Jam Icons',
      website: 'jam-icons.com',
      icon: 'jamGlassFilled',
      license: 'MIT',
      package: '@ng-icons/jam-icons',
      icons: async () => {
        return { default: await import('@ng-icons/jam-icons') };
      },
    },
    {
      name: 'Octicons',
      website: 'github.com/primer/octicons',
      icon: 'octMarkGithub',
      license: 'MIT',
      package: '@ng-icons/octicons',
      icons: async () => {
        return { default: await import('@ng-icons/octicons') };
      },
    },
    {
      name: 'Radix UI',
      website: 'icons.modulz.app',
      icon: 'radixModulzLogo',
      license: 'MIT',
      package: '@ng-icons/radix-icons',
      icons: async () => {
        return { default: await import('@ng-icons/radix-icons') };
      },
    },
    {
      name: 'Tabler Icons',
      website: 'tabler-icons.io',
      icon: 'tablerTools',
      license: 'MIT',
      package: '@ng-icons/tabler-icons',
      icons: async () => {
        return { default: await import('@ng-icons/tabler-icons') };
      },
    },
    {
      name: 'Akar Icons',
      website: 'akaricons.com',
      icon: 'akarRadish',
      license: 'MIT',
      package: '@ng-icons/akar-icons',
      icons: async () => {
        return { default: await import('@ng-icons/akar-icons') };
      },
    },
    {
      name: 'Iconoir',
      website: 'iconoir.com',
      icon: 'iconoirIconoir',
      license: 'MIT',
      package: '@ng-icons/iconoir',
      icons: async () => {
        return { default: await import('@ng-icons/iconoir') };
      },
    },
    {
      name: 'Cryptocurrency',
      website: 'http://cryptoicons.co',
      icon: 'cryptoBtc',
      license: 'CC0-1.0',
      package: '@ng-icons/cryptocurrency-icons',
      icons: async () => {
        return { default: await import('@ng-icons/cryptocurrency-icons') };
      },
    },
    {
      name: 'Simple Icons',
      website: 'simpleicons.org',
      icon: 'simpleSimpleicons',
      license: 'CC0-1.0',
      package: '@ng-icons/simple-icons',
      icons: async () => {
        return { default: await import('@ng-icons/simple-icons') };
      },
    },
    {
      name: 'Typicons',
      website: 'www.s-ings.com/typicons',
      license: 'CC-BY-SA-4.0',
      icon: 'typInfinityOutline',
      package: '@ng-icons/typicons',
      icons: async () => {
        return { default: await import('@ng-icons/typicons') };
      },
    },
    {
      name: 'Dripicons',
      website: 'github.com/amitjakhu/dripicons',
      icon: 'dripFlag',
      license: 'CC-BY-SA-4.0',
      package: '@ng-icons/dripicons',
      icons: async () => {
        return { default: await import('@ng-icons/dripicons') };
      },
    },
    {
      name: 'UX Aspects',
      website: 'uxaspects.github.io/UXAspects',
      icon: 'aspectsDashboard',
      license: 'Apache 2.0',
      package: '@ng-icons/ux-aspects',
      icons: async () => {
        return { default: await import('@ng-icons/ux-aspects') };
      },
    },
    {
      name: 'Circum Icons',
      website: 'circumicons.com',
      icon: 'circumIcon',
      license: 'MPL-2.0',
      package: '@ng-icons/circum-icons',
      icons: async () => {
        return { default: await import('@ng-icons/circum-icons') };
      },
    },
    {
      name: 'Material File Icons',
      website: 'github.com/PKief/vscode-material-icon-theme',
      icon: 'matfDocumentUncolored',
      license: 'MIT',
      package: '@ng-icons/material-file-icons',
      icons: async () => {
        const [colored, uncolored] = await Promise.all([
          import('@ng-icons/material-file-icons/colored'),
          import('@ng-icons/material-file-icons/uncolored'),
        ]);

        return { colored, uncolored };
      },
    },
    {
      name: 'Lucide',
      website: 'lucide.dev',
      icon: 'featherFeather',
      license: 'ISC',
      package: '@ng-icons/lucide',
      icons: async () => {
        return { default: await import('@ng-icons/lucide') };
      },
    },
    {
      name: 'Remixicon',
      website: 'remixicon.com',
      icon: 'remixRemixiconLine',
      license: 'Apache 2.0',
      package: '@ng-icons/remixicon',
      icons: async () => {
        return { default: await import('@ng-icons/remixicon') };
      },
    },
  ];

  // store the current active iconset
  activeIconset: Iconset | null = null;

  showToast?: boolean;

  /** Store the debounced query */
  search$ = new BehaviorSubject<string>('');

  /** Store the icons */
  icons$ = new BehaviorSubject<IconLists>({});

  /** Store the active category */
  category$ = new BehaviorSubject<string>('');

  /** Get the available categories */
  categories$ = this.icons$.pipe(map(icons => Object.keys(icons)));

  /** Determine the active category index */
  activeCategoryIndex$ = this.categories$.pipe(
    map(categories => {
      return categories.findIndex(
        category => category === this.category$.value,
      );
    }),
  );

  /** Filter the icons whenever the search query or the icons changes */
  filteredIcons$ = combineLatest([
    this.search$,
    this.icons$,
    this.category$,
  ]).pipe(
    map(([search, icons, category]) => {
      if (!search) {
        return Object.keys(icons[category] ?? {});
      }

      const query = search.toLowerCase();

      if (!icons[category]) {
        return [];
      }

      return Object.keys(icons[category]).filter(icon =>
        icon.toLowerCase().includes(query),
      );
    }),
  );

  private toastTimeout?: number;

  ngOnInit(): void {
    Promise.resolve().then(() => this.loadIconset(this.iconsets[0]));
  }

  copyToClipboard(icon: string): void {
    this.clipboard.copy(icon);

    // show the toast
    this.showToast = true;

    clearTimeout(this.toastTimeout);

    this.toastTimeout = window.setTimeout(() => (this.showToast = false), 2000);
  }

  trackByFn(_: number, item: string): string {
    return item;
  }

  async loadIconset(iconset: Iconset): Promise<void> {
    const icons = await iconset.icons();
    const token = this.injector.get(NgIconsToken);

    // augment the tokens with the new icons without changing the instance
    for (const category of Object.keys(icons)) {
      for (const icon in icons[category]) {
        token[0][icon] = icons[category][icon];
      }
    }

    // update the icons to show
    this.activeIconset = iconset;
    this.category$.next(Object.keys(icons)[0]);
    this.icons$.next(icons);
  }

  setCategoryIndex(index: number): void {
    const category = Object.keys(this.icons$.value)[index];
    this.category$.next(category);
  }
}

export interface Iconset {
  name: string;
  website: string;
  icon: string;
  license: string;
  package?: string;
  icons: () => Promise<IconLists>;
}

type IconLists = Record<string, IconList>;
type IconList = Record<string, string>;
