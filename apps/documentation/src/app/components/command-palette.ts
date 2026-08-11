import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { injectDocs } from '../docs/docs-nav';
import { IconCatalog } from '../icons/icon-catalog';
import { iconAt, searchIndex, type IconRef } from '../icons/icon-index';
import { SvgIcon } from '../icons/svg-icon';
import { provideUiIcons } from '../shared/ui-icons';

const MAX_ICONS = 6;
const MAX_DOCS = 4;

/** ⌘K search across every icon and every docs page. */
@Component({
  selector: 'app-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, SvgIcon],
  providers: [provideUiIcons()],
  template: `
    <div
      class="mob:px-6 mob:pt-24 mob:pb-6 fixed inset-0 z-100 flex items-start justify-center px-3 py-3"
    >
      <button
        type="button"
        class="fixed inset-0 -z-1 bg-black/40 backdrop-blur-[2px]"
        (click)="closed.emit()"
        aria-label="Close search"
      ></button>
      <div
        class="animate-fade-up border-line bg-bg-0 mob:max-h-140 flex max-h-[calc(100vh-88px)] w-full max-w-155 flex-col overflow-hidden rounded-2xl border shadow-md"
        role="dialog"
        aria-label="Search"
        aria-modal="true"
        (click)="$event.stopPropagation()"
        (keydown)="onKeydown($event)"
      >
        <div
          class="border-line flex h-14 shrink-0 items-center gap-2.5 border-b px-4"
        >
          <ng-icon name="remixSearchLine" size="20px" class="text-soft" />
          <input
            #field
            type="search"
            class="text-strong min-w-0 flex-1 border-none bg-transparent text-base outline-none"
            placeholder="Search icons and documentation…"
            [value]="query()"
            (input)="onQuery($event)"
          />
          <button
            type="button"
            class="bg-bg-weak text-soft shrink-0 rounded-[5px] px-1.75 py-0.75 font-mono text-[11px]"
            (click)="closed.emit()"
          >
            esc
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-2">
          @if (icons().length) {
            <div
              class="text-soft px-2.5 pt-2 pb-1.5 text-xs font-medium tracking-[0.04em] uppercase"
            >
              Icons
            </div>
            @for (icon of icons(); track icon.name; let i = $index) {
              <button
                type="button"
                class="flex h-11 w-full items-center gap-3 rounded-[10px] px-2.5 text-left"
                [class.bg-bg-weak]="active() === i"
                (click)="openIcon(icon)"
                (mouseenter)="active.set(i)"
              >
                <span
                  class="border-line text-strong flex size-7 shrink-0 items-center justify-center rounded-lg border"
                >
                  <app-svg-icon [svg]="catalog.body(icon)" [size]="18" />
                </span>
                <span
                  class="text-strong min-w-0 flex-1 truncate font-mono text-[13px]"
                >
                  {{ icon.name }}
                </span>
                <span class="text-soft shrink-0 text-xs">{{
                  icon.set.name
                }}</span>
              </button>
            }
          }

          @if (docs().length) {
            <div
              class="text-soft px-2.5 pt-3 pb-1.5 text-xs font-medium tracking-[0.04em] uppercase"
            >
              Documentation
            </div>
            @for (doc of docs(); track doc.slug; let i = $index) {
              <button
                type="button"
                class="flex h-11 w-full items-center gap-3 rounded-[10px] px-2.5 text-left"
                [class.bg-bg-weak]="active() === icons().length + i"
                (click)="openDoc(doc.slug)"
                (mouseenter)="active.set(icons().length + i)"
              >
                <span
                  class="border-line text-sub flex size-7 shrink-0 items-center justify-center rounded-lg border"
                >
                  <ng-icon name="remixArticleLine" size="16px" />
                </span>
                <span
                  class="min-w-0 flex-1 truncate text-sm font-medium tracking-[-0.006em]"
                >
                  {{ doc.title }}
                </span>
                <span class="text-soft shrink-0 text-xs">{{
                  doc.section
                }}</span>
              </button>
            }
          }

          @if (!icons().length && !docs().length) {
            <div
              class="flex flex-col items-center gap-2 px-6 py-12 text-center"
            >
              <ng-icon name="remixSearchLine" size="28px" class="text-soft" />
              <span class="text-sub text-sm">
                @if (catalog.ready()) {
                  No icons or pages match “{{ query() }}”
                } @else {
                  Indexing icons…
                }
              </span>
            </div>
          }
        </div>

        <div
          class="border-line bg-bg-weak flex h-11 shrink-0 items-center gap-4 border-t px-4"
        >
          <span class="text-soft flex items-center gap-1.5 text-xs">
            <span
              class="border-line bg-bg-0 rounded border px-1.5 py-0.5 font-mono"
              >↑↓</span
            >
            navigate
          </span>
          <span class="text-soft flex items-center gap-1.5 text-xs">
            <span
              class="border-line bg-bg-0 rounded border px-1.5 py-0.5 font-mono"
              >↵</span
            >
            open
          </span>
          <div class="flex-1"></div>
          <button
            type="button"
            class="text-primary text-xs font-medium"
            (click)="browseAll()"
          >
            Browse all icons →
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CommandPalette {
  protected readonly catalog = inject(IconCatalog);
  private readonly router = inject(Router);
  private readonly allDocs = injectDocs();
  private readonly field =
    viewChild.required<ElementRef<HTMLInputElement>>('field');

  readonly closed = output<void>();

  protected readonly query = signal('');
  protected readonly active = signal(0);

  protected readonly icons = computed<IconRef[]>(() => {
    const index = this.catalog.index();
    if (!index) {
      return [];
    }
    const { positions } = searchIndex(index, {
      text: this.query(),
      sets: null,
    });

    // One per set, so a search doesn't come back with six near-identical
    // results from whichever set happens to be largest.
    const seen = new Set<string>();
    const icons: IconRef[] = [];
    for (const position of positions) {
      const icon = iconAt(index, position);
      if (seen.has(icon.set.slug)) {
        continue;
      }
      seen.add(icon.set.slug);
      icons.push(icon);
      if (icons.length === MAX_ICONS) {
        break;
      }
    }
    return icons;
  });

  protected readonly docs = computed(() => {
    const text = this.query().trim().toLowerCase();
    return this.allDocs
      .filter(
        doc =>
          !text ||
          doc.title.toLowerCase().includes(text) ||
          doc.lead.toLowerCase().includes(text),
      )
      .slice(0, MAX_DOCS);
  });

  constructor() {
    void this.catalog.load();
    afterNextRender(() => this.field().nativeElement.focus());

    effect(() => this.catalog.loadBodies(this.icons()));
    effect(() => {
      this.query();
      this.active.set(0);
    });
  }

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const total = this.icons().length + this.docs().length;
    if (total === 0) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      this.active.update(current => (current + step + total) % total);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const position = this.active();
      const icons = this.icons();
      if (position < icons.length) {
        this.openIcon(icons[position]);
      } else {
        this.openDoc(this.docs()[position - icons.length].slug);
      }
    }
  }

  protected openIcon(icon: IconRef): void {
    void this.router.navigate(['/browse'], {
      queryParams: { sets: icon.set.slug, icon: icon.name },
    });
    this.closed.emit();
  }

  protected openDoc(slug: string): void {
    void this.router.navigate(['/docs', slug]);
    this.closed.emit();
  }

  protected browseAll(): void {
    void this.router.navigate(['/browse'], {
      queryParams: { q: this.query() || null },
    });
    this.closed.emit();
  }
}
