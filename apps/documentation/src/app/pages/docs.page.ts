import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { injectDocs, toSections } from '../docs/docs-nav';
import { provideUiIcons } from '../shared/ui-icons';

/** Shell for the documentation: sidebar, page, and the sidebar's drawer form. */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink, RouterLinkActive, RouterOutlet],
  providers: [provideUiIcons()],
  host: { class: 'mx-auto flex max-w-360 items-start' },
  template: `
    <aside
      class="border-line bg-bg-0 fixed top-16 bottom-0 left-0 z-88 w-[min(320px,88vw)] overflow-y-auto border-r px-4 py-6 transition-transform duration-200 xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] xl:w-68 xl:min-w-52 xl:shrink xl:translate-x-0 xl:shadow-none"
      [class]="drawerOpen() ? 'translate-x-0 shadow-md' : '-translate-x-[104%]'"
    >
      <div class="mb-3.5 flex h-8 items-center xl:hidden">
        <span class="flex-1 text-[15px] font-semibold tracking-[-0.011em]">
          Documentation
        </span>
        <button
          type="button"
          class="text-soft hover:bg-bg-weak flex size-8 items-center justify-center rounded-lg"
          (click)="drawerOpen.set(false)"
          aria-label="Close navigation"
        >
          <ng-icon name="remixCloseLine" size="18px" />
        </button>
      </div>

      <nav>
        @for (section of sections; track section.label) {
          <div class="mb-5.5">
            <div
              class="text-soft p-1 text-xs font-medium tracking-[0.04em] uppercase"
            >
              {{ section.label }}
            </div>
            <div class="mt-1.5 flex flex-col gap-0.5">
              @for (page of section.pages; track page.slug) {
                <a
                  [routerLink]="['/docs', page.slug]"
                  routerLinkActive="bg-bg-weak text-strong [&>span]:bg-primary"
                  (click)="drawerOpen.set(false)"
                  class="text-sub hover:bg-bg-weak relative flex h-8.5 items-center rounded-lg px-3 text-sm font-medium tracking-[-0.006em]"
                >
                  <span
                    class="absolute top-1.75 -left-4 h-5 w-1 rounded-r bg-transparent"
                  ></span>
                  {{ page.title }}
                </a>
              }
            </div>
          </div>
        }
      </nav>
    </aside>

    @if (drawerOpen()) {
      <button
        type="button"
        class="animate-scrim-in fixed inset-x-0 top-16 bottom-0 z-84 bg-black/40 backdrop-blur-[2px] xl:hidden"
        (click)="drawerOpen.set(false)"
        aria-label="Close navigation"
      ></button>
    }

    <main
      class="mob:px-8 mob:pt-10 mob:pb-24 max-w-195 min-w-0 flex-[1_1_35rem] px-5 pt-6 pb-20 lg:px-12"
    >
      <button
        type="button"
        class="border-line hover:bg-bg-weak mb-4.5 flex h-9.5 w-fit items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium xl:hidden"
        (click)="drawerOpen.set(true)"
      >
        <ng-icon name="remixMenuLine" size="16px" class="text-sub" />
        <span>All pages</span>
      </button>

      <router-outlet />
    </main>
  `,
})
export default class DocsPage {
  protected readonly sections = toSections(injectDocs());
  protected readonly drawerOpen = signal(false);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.drawerOpen.set(false);
  }
}
