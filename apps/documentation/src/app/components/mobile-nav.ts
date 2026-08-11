import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { LOGO } from '../shared/asset-url';
import { Stats } from '../shared/stats';
import { ThemeService } from '../shared/theme';
import { provideUiIcons } from '../shared/ui-icons';

/** The slide-in navigation shown instead of the header links on narrow screens. */
@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink, RouterLinkActive],
  providers: [provideUiIcons()],
  template: `
    <button
      type="button"
      class="fixed inset-0 z-90 bg-black/40 backdrop-blur-[2px]"
      (click)="closed.emit()"
      aria-label="Close menu"
    ></button>
    <div
      class="animate-fade-up border-line bg-bg-0 fixed inset-y-0 left-0 z-91 flex w-[min(320px,88vw)] flex-col gap-1.5 border-r p-4 shadow-md"
      role="dialog"
      aria-label="Navigation"
    >
      <div class="mb-2 flex h-10 items-center gap-2.5">
        <img [src]="logo" alt="" width="24" height="24" class="block" />
        <span class="flex-1 text-[15px] font-semibold tracking-[-0.011em]">
          Angular Icons
        </span>
        <button
          type="button"
          class="text-soft hover:bg-bg-weak flex size-8 items-center justify-center rounded-lg"
          (click)="closed.emit()"
          aria-label="Close menu"
        >
          <ng-icon name="remixCloseLine" size="18px" />
        </button>
      </div>

      @for (link of links; track link.path) {
        <a
          [routerLink]="link.path"
          routerLinkActive="text-strong"
          [routerLinkActiveOptions]="{ exact: link.exact }"
          (click)="closed.emit()"
          class="text-sub hover:bg-bg-weak flex h-11.5 items-center rounded-[10px] px-3 text-base font-medium tracking-[-0.011em]"
        >
          {{ link.label }}
        </a>
      }

      <div class="bg-line mx-0.5 my-2.5 h-px"></div>

      <button
        type="button"
        class="text-sub hover:bg-bg-weak flex h-11.5 items-center gap-2.5 rounded-[10px] px-3 text-[15px] font-medium"
        (click)="theme.toggle()"
      >
        <ng-icon
          [name]="theme.theme() === 'dark' ? 'remixSunLine' : 'remixMoonLine'"
          size="18px"
        />
        <span>
          {{
            theme.theme() === 'dark' ? 'Light appearance' : 'Dark appearance'
          }}
        </span>
      </button>

      <a
        href="https://github.com/ng-icons/ng-icons"
        target="_blank"
        rel="noreferrer"
        class="text-sub hover:bg-bg-weak flex h-11.5 items-center gap-2.5 rounded-[10px] px-3 text-[15px] font-medium"
      >
        <ng-icon name="remixGithubFill" size="18px" />
        <span>GitHub · {{ stats.stars() }}</span>
      </a>

      <div class="flex-1"></div>

      <a
        href="https://angularprimitives.com"
        target="_blank"
        rel="noreferrer"
        class="bg-primary-weak text-primary flex items-center gap-2.5 rounded-xl p-3"
      >
        <span
          class="bg-bg-0 inline-flex h-5.5 items-center rounded-full px-2 text-[11px] font-medium tracking-[0.02em] uppercase"
        >
          New
        </span>
        <span class="text-sm font-medium">Meet Angular Primitives ↗</span>
      </a>
    </div>
  `,
})
export class MobileNav {
  protected readonly theme = inject(ThemeService);
  protected readonly stats = inject(Stats);

  readonly closed = output<void>();

  protected readonly logo = LOGO;
  protected readonly links = [
    { path: '/docs', label: 'Documentation', exact: false },
    { path: '/iconsets', label: 'Iconsets', exact: true },
    { path: '/browse', label: 'Browse icons', exact: true },
  ];
}
