import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { LOGO } from '../shared/asset-url';
import { ICON_STATS, Stats } from '../shared/stats';
import { ThemeService } from '../shared/theme';
import { provideUiIcons } from '../shared/ui-icons';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink, RouterLinkActive],
  providers: [provideUiIcons()],
  host: {
    class:
      'sticky top-0 z-60 flex h-16 items-center gap-2.5 border-b border-line bg-bg-0 px-3.5 nav:px-6 lg:gap-4',
  },
  template: `
    <button
      type="button"
      class="text-sub hover:bg-bg-weak nav:hidden -mr-1 flex size-8.5 shrink-0 items-center justify-center rounded-[10px]"
      (click)="menu.emit()"
      aria-label="Open menu"
    >
      <ng-icon name="remixMenuLine" size="20px" />
    </button>

    <a routerLink="/" class="text-strong flex shrink-0 items-center gap-2.5">
      <img [src]="logo" alt="" width="26" height="26" class="block" />
      <span
        class="text-[15px] font-semibold tracking-[-0.011em] whitespace-nowrap"
      >
        Angular Icons
      </span>
      <span
        class="border-line text-soft xs:inline hidden shrink-0 rounded-full border px-1.75 py-0.5 font-mono text-[11px]"
      >
        v{{ version }}
      </span>
    </a>

    <nav class="nav:flex ml-3 hidden shrink-0 items-center gap-1">
      @for (link of links; track link.path) {
        <a
          [routerLink]="link.path"
          routerLinkActive="text-strong"
          [routerLinkActiveOptions]="{ exact: link.exact }"
          class="text-sub hover:bg-bg-weak rounded-lg px-3 py-1.75 text-sm font-medium tracking-[-0.006em] whitespace-nowrap"
        >
          {{ link.label }}
        </a>
      }
    </nav>

    <div class="flex-1"></div>

    <a
      href="https://angularprimitives.com"
      target="_blank"
      rel="noreferrer"
      title="Headless, composable primitives for building accessible Angular UI"
      class="bg-primary-weak text-primary hover:bg-primary-line nav:flex hidden h-7.5 shrink-0 items-center gap-2 rounded-full px-1 text-[13px] font-medium whitespace-nowrap"
    >
      <!--
        The chip appears alongside the desktop nav rather than only above
        1280px. Hiding the whole thing left no link to Primitives at all
        between 880px (where the drawer that holds one stops being reachable)
        and 1280px, so the badge and the longer wording drop instead.
      -->
      <span
        class="bg-bg-0 hidden h-5.5 shrink-0 items-center rounded-full px-2 text-[11px] font-medium tracking-[0.02em] uppercase md:inline-flex"
      >
        New
      </span>
      <span class="px-2 whitespace-nowrap md:hidden">Primitives ↗</span>
      <span class="hidden pr-1.5 whitespace-nowrap md:inline">
        Meet Angular Primitives ↗
      </span>
    </a>

    <button
      type="button"
      class="border-line bg-bg-0 text-soft hover:border-line-strong flex h-8.5 max-w-70 shrink items-center gap-2 rounded-[10px] border pr-2 pl-2.5 text-[13px] shadow-xs"
      (click)="openSearch.emit()"
    >
      <ng-icon name="remixSearchLine" size="16px" class="shrink-0" />
      <span class="hidden min-w-0 flex-auto truncate lg:inline">
        Search {{ iconCount }} icons…
      </span>
      <span
        class="bg-bg-weak hidden shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px] lg:inline"
      >
        ⌘K
      </span>
    </button>

    <button
      type="button"
      class="border-line text-sub hover:bg-bg-weak flex size-8.5 shrink-0 items-center justify-center rounded-[10px] border"
      (click)="theme.toggle()"
      [attr.aria-label]="
        theme.theme() === 'dark'
          ? 'Switch to light appearance'
          : 'Switch to dark appearance'
      "
    >
      <ng-icon
        [name]="theme.theme() === 'dark' ? 'remixSunLine' : 'remixMoonLine'"
        size="18px"
      />
    </button>

    <a
      href="https://github.com/ng-icons/ng-icons"
      target="_blank"
      rel="noreferrer"
      class="border-line text-strong hover:bg-bg-weak hidden h-8.5 shrink-0 items-center gap-2 rounded-[10px] border px-3 text-[13px] font-medium shadow-xs sm:flex"
    >
      <ng-icon name="remixGithubFill" size="16px" />
      <span>{{ stats.stars() }}</span>
      <span class="sr-only">stars on GitHub</span>
    </a>
  `,
})
export class SiteHeader {
  protected readonly theme = inject(ThemeService);
  protected readonly stats = inject(Stats);

  readonly menu = output<void>();
  readonly openSearch = output<void>();

  protected readonly logo = LOGO;
  protected readonly version = ICON_STATS.version;
  protected readonly iconCount = ICON_STATS.iconCount.toLocaleString('en-GB');

  protected readonly links = [
    { path: '/docs', label: 'Documentation', exact: false },
    { path: '/iconsets', label: 'Iconsets', exact: true },
    { path: '/browse', label: 'Browse icons', exact: true },
  ];

  constructor() {
    this.stats.load();
  }
}
