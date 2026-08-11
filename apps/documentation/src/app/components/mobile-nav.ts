import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  output,
  viewChild,
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
      aria-modal="true"
      aria-label="Navigation"
      tabindex="-1"
      (keydown)="onKeydown($event)"
      #panel
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
    </div>
  `,
})
export class MobileNav {
  protected readonly theme = inject(ThemeService);
  protected readonly stats = inject(Stats);

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly document = inject(DOCUMENT);

  readonly closed = output<void>();

  constructor() {
    // The drawer covers the page, so the page should not scroll underneath it.
    // Restored on destroy rather than toggled, because the drawer only exists
    // while it is open.
    const body = this.document.body;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    inject(DestroyRef).onDestroy(() => {
      body.style.overflow = previous;
    });

    // Focus moves in, so the keyboard lands inside the dialog rather than
    // continuing from wherever the trigger was.
    afterNextRender(() => this.panel()?.nativeElement.focus());
  }

  /** Keeps Tab inside the drawer for as long as it is open. */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = this.panel()?.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusable?.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement;

    if (
      event.shiftKey &&
      (active === first || active === this.panel()?.nativeElement)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  protected readonly logo = LOGO;
  protected readonly links = [
    { path: '/docs', label: 'Documentation', exact: false },
    { path: '/iconsets', label: 'Iconsets', exact: true },
    { path: '/browse', label: 'Browse icons', exact: true },
  ];
}
