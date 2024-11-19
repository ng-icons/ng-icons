/* eslint-disable @nx/enforce-module-boundaries */
import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { akarRadish } from '@ng-icons/akar-icons';
import { bootstrapBootstrapFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, NgIconsToken, provideIcons } from '@ng-icons/core';
import { cryptoBtc } from '@ng-icons/cryptocurrency-icons';
import { cssShapeHexagon } from '@ng-icons/css.gg';
import { diDeviconPlain } from '@ng-icons/devicon/plain';
import { dripFlag } from '@ng-icons/dripicons';
import { featherFeather, featherShield } from '@ng-icons/feather-icons';
import { faFlag, faFontAwesome } from '@ng-icons/font-awesome/regular';
import { gameAncientSword } from '@ng-icons/game-icons';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { hugeShoppingBasket01 } from '@ng-icons/huge-icons';
import { iconoirIconoir } from '@ng-icons/iconoir';
import { saxColorsSquareOutline } from '@ng-icons/iconsax/outline';
import { ionLogoIonic } from '@ng-icons/ionicons';
import { jamGlassFilled } from '@ng-icons/jam-icons';
import { letsDimondAltLight } from '@ng-icons/lets-icons/light';
import { matfDocumentUncolored } from '@ng-icons/material-file-icons/uncolored';
import { octMarkGithub } from '@ng-icons/octicons';
import { phosphorPhosphorLogo } from '@ng-icons/phosphor-icons/regular';
import { radixModulzLogo } from '@ng-icons/radix-icons';
import { remixRemixiconLine } from '@ng-icons/remixicon';
import { simpleSimpleicons } from '@ng-icons/simple-icons';
import { tablerBrandGoogle, tablerTools } from '@ng-icons/tabler-icons';
import { tdesignCombination } from '@ng-icons/tdesign-icons';
import { typInfinityOutline } from '@ng-icons/typicons';
import { aspectsDashboard } from '@ng-icons/ux-aspects';
import { RxFor } from '@rx-angular/template/for';
import Fuse from 'fuse.js';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIcon,
    FadeInContainerDirective,
    FadeInDirective,
    FormsModule,
    SegmentComponent,
    RxFor,
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
      faFontAwesome,
      saxColorsSquareOutline,
      tdesignCombination,
      phosphorPhosphorLogo,
      letsDimondAltLight,
      hugeShoppingBasket01,
      diDeviconPlain,
      gameAncientSword,
      faFlag,
    }),
  ],
})
export class BrowseIconsComponent implements OnInit {
  private readonly injector = inject(Injector);
  private readonly clipboard = inject(Clipboard);
  readonly year = new Date().getFullYear();
  readonly iconsets: Iconset[] = [
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
        const [outline, fill] = await Promise.all([
          await import('@ng-icons/tabler-icons'),
          await import('@ng-icons/tabler-icons/fill'),
        ]);
        return { outline, fill };
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
        return {
          default: await import('@ng-icons/cryptocurrency-icons'),
          colored: await import('@ng-icons/cryptocurrency-icons/colored'),
        };
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
    {
      name: 'FontAwesome',
      website: 'fontawesome.com',
      icon: 'faFontAwesome',
      license: 'CC BY 4.0',
      package: '@ng-icons/font-awesome',
      icons: async () => {
        const [regular, solid, brands] = await Promise.all([
          import('@ng-icons/font-awesome/regular'),
          import('@ng-icons/font-awesome/solid'),
          import('@ng-icons/font-awesome/brands'),
        ]);
        return { regular, solid, brands };
      },
    },
    {
      name: 'Iconsax',
      website: 'iconsax.io',
      icon: 'saxColorsSquareOutline',
      license: 'Custom',
      package: '@ng-icons/iconsax/bold',
      icons: async () => {
        const [bold, bulk, outline] = await Promise.all([
          import('@ng-icons/iconsax/bold'),
          import('@ng-icons/iconsax/bulk'),
          import('@ng-icons/iconsax/outline'),
        ]);
        return { bold, bulk, outline };
      },
    },
    {
      name: 'TDesign Icons',
      website: 'tdesign.tencent.com',
      icon: 'tdesignCombination',
      license: 'MIT',
      package: '@ng-icons/tdesign-icons',
      icons: async () => {
        return { default: await import('@ng-icons/tdesign-icons') };
      },
    },
    {
      name: 'Phosphor Icons',
      website: 'phosphoricons.com/',
      icon: 'phosphorPhosphorLogo',
      license: 'MIT',
      package: '@ng-icons/phosphor-icons/regular',
      icons: async () => {
        const [regular, bold, duotone, fill, light, thin] = await Promise.all([
          import('@ng-icons/phosphor-icons/regular'),
          import('@ng-icons/phosphor-icons/bold'),
          import('@ng-icons/phosphor-icons/duotone'),
          import('@ng-icons/phosphor-icons/fill'),
          import('@ng-icons/phosphor-icons/light'),
          import('@ng-icons/phosphor-icons/thin'),
        ]);
        return { regular, bold, duotone, fill, light, thin };
      },
    },
    {
      name: 'Lets Icons',
      website:
        'figma.com/community/file/886554014393250663/free-icon-pack-1800-icons',
      icon: 'letsDimondAltLight',
      license: 'CC BY 4.0',
      package: '@ng-icons/lets-icons',
      icons: async () => {
        const [regular, fill, light, duotone, duotoneLine] = await Promise.all([
          import('@ng-icons/lets-icons/regular'),
          import('@ng-icons/lets-icons/fill'),
          import('@ng-icons/lets-icons/light'),
          import('@ng-icons/lets-icons/duotone'),
          import('@ng-icons/lets-icons/duotone-line'),
        ]);
        return { regular, fill, light, duotone, duotoneLine };
      },
    },
    {
      name: 'Huge Icons',
      website: 'hugeicons.com',
      icon: 'hugeShoppingBasket01',
      license: 'CC0-1.0',
      package: '@ng-icons/huge-icons',
      icons: async () => {
        return { default: await import('@ng-icons/huge-icons') };
      },
    },
    {
      name: 'Devicon',
      website: 'github.com/devicons/devicon',
      icon: 'diDeviconPlain',
      license: 'MIT',
      package: '@ng-icons/devicon',
      icons: async () => {
        const [line, original, plain] = await Promise.all([
          import('@ng-icons/devicon/line'),
          import('@ng-icons/devicon/original'),
          import('@ng-icons/devicon/plain'),
        ]);
        return { line, original, plain };
      },
    },
    {
      name: 'Game Icons',
      website: 'game-icons.net',
      icon: 'gameAncientSword',
      license: 'CC-BY-3.0',
      package: '@ng-icons/game-icons',
      icons: async () => {
        return { default: await import('@ng-icons/game-icons') };
      },
    },
    {
      name: 'Flag Icons',
      website: 'flagicons.lipis.dev',
      icon: 'faFlag',
      license: 'MIT',
      package: '@ng-icons/flag-icons',
      icons: async () => {
        const [standard, square] = await Promise.all([
          import('@ng-icons/flag-icons'),
          import('@ng-icons/flag-icons/square'),
        ]);
        return { default: standard, square };
      },
    },
  ];
  // store the current active iconset
  readonly activeIconset = signal<Iconset | null>(null);
  readonly showToast = signal<boolean>(false);
  /** Store the debounced query */
  readonly search = model<string>('');
  /** Store the icons */
  readonly icons = signal<IconLists>({});
  /** Store the active category */
  readonly category = signal<string>('');
  /** Get the available categories */
  readonly categories = computed(() => Object.keys(this.icons()));
  /** Handle fuzzy search */
  readonly fuze = computed(() => {
    const icons = Object.keys(this.icons()[this.category()] ?? {});
    return new Fuse(icons, {
      isCaseSensitive: false,
      shouldSort: true,
      threshold: 0.3,
    });
  });
  /** Determine the active category index */
  readonly activeCategoryIndex = computed(() => {
    const index = this.categories().findIndex(
      category => category === this.category(),
    );
    return index === -1 ? 0 : index;
  });
  /** Filter the icons whenever the search query or the icons changes */
  readonly filteredIcons = computed(() => {
    if (!this.search()) {
      return Object.keys(this.icons()[this.category()] ?? {});
    }
    return this.fuze()
      .search(this.search())
      .map(result => result.item);
  });
  private toastTimeout?: number;
  ngOnInit(): void {
    Promise.resolve().then(() => this.loadIconset(this.iconsets[0]));
  }
  copyToClipboard(icon: string): void {
    this.clipboard.copy(icon);
    // show the toast
    this.showToast.set(true);
    clearTimeout(this.toastTimeout);
    this.toastTimeout = window.setTimeout(
      () => this.showToast.set(false),
      2000,
    );
  }
  trackByFn(_: number, item: string): string {
    return item;
  }
  shortUrl(url?: string): string {
    if (!url) {
      return '';
    }
    // only take the url up until the first slash
    return url.split('/')[0];
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
    this.activeIconset.set(iconset);
    this.category.set(Object.keys(icons)[0]);
    this.icons.set(icons);
  }
  setCategoryIndex(index: number): void {
    const category = Object.keys(this.icons())[index];
    this.category.set(category);
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
