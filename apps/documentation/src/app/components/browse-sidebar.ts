import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import type { IconSet } from '../icons/icon-index';
import { provideUiIcons } from '../shared/ui-icons';

export type BrowseTab = 'all' | 'favourites';

/** Set filters and the all/favourites switch for the browse page. */
@Component({
  selector: 'app-browse-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  providers: [provideUiIcons()],
  host: { class: 'flex flex-col gap-5 p-5' },
  template: `
    @if (dismissable()) {
      <div class="flex h-8 items-center xl:hidden">
        <span class="flex-1 text-[15px] font-semibold tracking-[-0.011em]">
          Filters
        </span>
        <button
          type="button"
          class="text-soft hover:bg-bg-weak flex size-8 items-center justify-center rounded-lg"
          (click)="dismiss.emit()"
          aria-label="Close filters"
        >
          <ng-icon name="remixCloseLine" size="18px" />
        </button>
      </div>
    }

    <!--
      A group of pressable buttons rather than tabs: the results they filter are
      not a tabpanel, and none of the arrow-key behaviour a tab list promises is
      implemented, so a tab role described a widget that was not there.
    -->
    <div class="flex flex-col gap-0.5" role="group" aria-label="Icon list">
      <button
        type="button"
        [attr.aria-pressed]="tab() === 'all'"
        class="hover:bg-bg-weak flex h-9 items-center gap-2.5 rounded-lg px-2.5"
        [class.bg-bg-weak]="tab() === 'all'"
        (click)="tab.set('all')"
      >
        <ng-icon name="remixLayoutGridLine" size="18px" class="text-sub" />
        <span
          class="flex-1 text-left text-sm font-medium tracking-[-0.006em]"
          [class.text-strong]="tab() === 'all'"
          [class.text-sub]="tab() !== 'all'"
        >
          All icons
        </span>
      </button>
      <button
        type="button"
        [attr.aria-pressed]="tab() === 'favourites'"
        class="hover:bg-bg-weak flex h-9 items-center gap-2.5 rounded-lg px-2.5"
        [class.bg-bg-weak]="tab() === 'favourites'"
        (click)="tab.set('favourites')"
      >
        <ng-icon name="remixHeartFill" size="18px" class="text-primary" />
        <span
          class="flex-1 text-left text-sm font-medium tracking-[-0.006em]"
          [class.text-strong]="tab() === 'favourites'"
          [class.text-sub]="tab() !== 'favourites'"
        >
          Favourites
        </span>
        <span class="text-soft font-mono text-[11px]">{{
          favouriteCount()
        }}</span>
      </button>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between p-1">
        <span class="text-soft text-xs font-medium tracking-[0.04em] uppercase">
          Icon sets
        </span>
        <!--
          Two separate actions rather than one toggle: with a handful of sets
          ticked there was no way to clear them short of unticking each one.
        -->
        <div class="flex items-center gap-2">
          @if (!allSelected()) {
            <button
              type="button"
              class="text-primary hover:text-primary-hover cursor-pointer text-xs font-medium"
              (click)="selectAll.emit(true)"
            >
              Select all
            </button>
          }
          @if (anySelected()) {
            <button
              type="button"
              class="text-primary hover:text-primary-hover cursor-pointer text-xs font-medium"
              (click)="selectAll.emit(false)"
            >
              Clear{{ allSelected() ? ' all' : '' }}
            </button>
          }
        </div>
      </div>
      <div
        class="border-line text-soft flex h-8.5 items-center gap-2 rounded-lg border px-2.5 text-[13px]"
      >
        <ng-icon name="remixSearchLine" size="16px" />
        <input
          type="search"
          class="text-strong min-w-0 flex-1 border-none bg-transparent text-[13px] outline-none"
          placeholder="Filter sets"
          [value]="filter()"
          (input)="filter.set($any($event.target).value)"
          aria-label="Filter icon sets"
        />
      </div>
    </div>

    <div class="flex flex-col gap-0.5">
      @for (set of visibleSets(); track set.slug) {
        <button
          type="button"
          class="hover:bg-bg-weak flex h-9 items-center gap-2.5 rounded-lg px-2.5"
          [class.bg-bg-weak]="isSelected(set.slug)"
          [attr.aria-pressed]="isSelected(set.slug)"
          (click)="toggled.emit(set.slug)"
        >
          <span
            class="flex size-4 shrink-0 items-center justify-center rounded-[5px] border text-white"
            [class]="
              isSelected(set.slug)
                ? 'border-primary bg-primary'
                : 'border-line-strong'
            "
          >
            @if (isSelected(set.slug)) {
              <ng-icon name="remixCheckLine" size="12px" />
            }
          </span>
          <span
            class="flex-1 truncate text-left text-sm font-medium tracking-[-0.006em]"
            [class.text-strong]="isSelected(set.slug)"
            [class.text-sub]="!isSelected(set.slug)"
          >
            {{ set.name }}
          </span>
          <span class="text-soft font-mono text-[11px]">
            {{ set.count.toLocaleString() }}
          </span>
        </button>
      }
      @if (!visibleSets().length) {
        <span class="text-soft px-2.5 py-2 text-[13px]">No sets match.</span>
      }
    </div>
  `,
})
export class BrowseSidebar {
  readonly sets = input.required<IconSet[]>();
  readonly selected = input.required<ReadonlySet<string>>();
  readonly favouriteCount = input(0);
  readonly dismissable = input(false);

  readonly tab = model<BrowseTab>('all');
  readonly toggled = output<string>();
  readonly selectAll = output<boolean>();
  readonly dismiss = output<void>();

  protected readonly filter = signal('');

  protected readonly visibleSets = computed(() => {
    const filter = this.filter().trim().toLowerCase();
    return filter
      ? this.sets().filter(set => set.name.toLowerCase().includes(filter))
      : this.sets();
  });

  /**
   * Whether every current set is selected.
   *
   * Compares membership rather than sizes. The selection comes from the URL, so
   * a bookmark naming a set that has since been renamed or removed counted
   * towards the size while leaving a real set unticked, and the sidebar offered
   * "Clear all" when "Select all" was still the useful action.
   */
  protected readonly allSelected = computed(() => {
    const sets = this.sets();
    const selected = this.selected();
    return sets.length > 0 && sets.every(set => selected.has(set.slug));
  });
  protected readonly anySelected = computed(() => this.selected().size > 0);

  protected isSelected(slug: string): boolean {
    return this.selected().has(slug);
  }
}
