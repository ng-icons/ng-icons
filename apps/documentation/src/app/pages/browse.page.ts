import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { BrowseSidebar, type BrowseTab } from '../components/browse-sidebar';
import { IconDetail } from '../components/icon-detail';
import {
  emptyState,
  planPage,
  resultSummary,
  sameSets,
} from '../icons/browse-paging';
import { fuzzyMatcher } from '../icons/fuzzy';
import { IconCatalog } from '../icons/icon-catalog';
import {
  groupBySet,
  iconAt,
  iconParam,
  resolveIconParam,
  searchIndex,
  type IconRef,
  type IconVariant,
} from '../icons/icon-index';
import { SvgIcon } from '../icons/svg-icon';
import { Favourites } from '../shared/favourites';
import { Seo } from '../shared/seo';
import { ICON_STATS } from '../shared/stats';
import { provideUiIcons } from '../shared/ui-icons';

/** Sets selected on a first visit, before anything is in the URL. */
const DEFAULT_SETS = ['remixicon', 'lucide', 'phosphor-icons', 'feather-icons'];
const PAGE_SIZE = 240;
/** Fewest icons a set shows before another set is added to the page. */
const MIN_PER_GROUP = 60;
const SUGGESTIONS = ['search', 'zoom', 'filter', 'command'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, SvgIcon, BrowseSidebar, IconDetail],
  providers: [provideUiIcons()],
  host: { class: 'flex min-h-[calc(100vh-4rem)] items-stretch' },
  template: `
    <!-- Filters: a drawer below 1180px, a column beside the results above it. -->
    <aside
      class="border-line bg-bg-0 fixed top-16 bottom-0 left-0 z-88 w-[min(320px,88vw)] shrink-0 overflow-y-auto border-r transition-transform duration-200 xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] xl:w-72 xl:translate-x-0 xl:shadow-none"
      [class]="drawerOpen() ? 'translate-x-0 shadow-md' : '-translate-x-[104%]'"
    >
      <app-browse-sidebar
        [sets]="sets()"
        [selected]="selected()"
        [favouriteCount]="favourites.count()"
        [dismissable]="true"
        [(tab)]="tab"
        (toggled)="toggleSet($event)"
        (selectAll)="selectAll($event)"
        (dismiss)="drawerOpen.set(false)"
      />
    </aside>

    @if (drawerOpen()) {
      <button
        type="button"
        class="animate-scrim-in fixed inset-x-0 top-16 bottom-0 z-84 bg-black/40 backdrop-blur-[2px] xl:hidden"
        (click)="drawerOpen.set(false)"
        aria-label="Close filters"
      ></button>
    }

    <main class="flex min-w-0 flex-1 flex-col">
      <div
        class="border-line bg-bg-0 mob:px-6 mob:pt-4.5 mob:pb-3.5 sticky top-16 z-40 border-b px-4 pt-3.5 pb-3"
      >
        <div
          class="border-line bg-bg-0 flex h-12 items-center gap-2.5 rounded-xl border px-3.5 shadow-xs"
        >
          <ng-icon name="remixSearchLine" size="20px" class="text-soft" />
          <input
            type="search"
            class="text-strong min-w-0 flex-1 border-none bg-transparent text-[15px] outline-none"
            [placeholder]="searchPlaceholder"
            [value]="query()"
            (input)="onQuery($event)"
            (keydown.escape)="clearQuery($event)"
            aria-label="Search icons"
          />
          @if (query()) {
            <button
              type="button"
              class="bg-bg-weak text-soft hidden shrink-0 rounded-[5px] px-1.75 py-0.75 font-mono text-[11px] sm:block"
              (click)="setQuery('')"
            >
              esc
            </button>
          }
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="border-line bg-bg-0 text-strong hover:bg-bg-weak flex h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium xl:hidden"
            (click)="drawerOpen.set(true)"
          >
            <ng-icon name="remixEqualizerLine" size="14px" class="text-sub" />
            <span>Filters</span>
            <span
              class="bg-primary-weak text-primary rounded-full px-1.5 py-px font-mono text-[11px]"
            >
              {{ selected().size }}
            </span>
          </button>

          <span class="text-sub text-[13px]">{{ resultLine() }}</span>

          @if (synonym()) {
            <span
              class="bg-primary-weak text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.75 text-xs font-medium"
            >
              Also matching “{{ synonym() }}”
            </span>
          }
          @if (fuzzy()) {
            <span
              class="bg-bg-weak text-sub inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.75 text-xs font-medium"
            >
              Closest matches
            </span>
          }

          <div class="flex-1"></div>

          <div
            class="border-line bg-bg-weak flex rounded-[9px] border p-0.5"
            role="group"
            aria-label="Icon size"
          >
            @for (option of sizes; track option) {
              <button
                type="button"
                class="rounded-[7px] px-2.5 py-1 text-xs font-medium"
                [class]="
                  size() === option ? 'bg-bg-0 text-strong' : 'text-soft'
                "
                (click)="size.set(option)"
                [attr.aria-pressed]="size() === option"
              >
                {{ option }}
              </button>
            }
          </div>
        </div>
      </div>

      @if (catalog.failed()) {
        <div class="flex flex-col items-center px-6 py-24 text-center">
          <div
            class="border-warning-line bg-warning-weak text-warning flex size-16 items-center justify-center rounded-[18px] border"
          >
            <ng-icon name="remixAlertLine" size="28px" />
          </div>
          <h2 class="mt-5 text-lg font-semibold tracking-[-0.014em]">
            Could not load the icon index
          </h2>
          <p class="text-sub mt-2 max-w-95 text-sm leading-[22px]">
            The icon data did not download, so there is nothing to search yet.
            Check your connection and try again.
          </p>
          <button
            type="button"
            class="bg-primary mt-5 flex h-10 items-center rounded-[10px] px-4.5 text-sm font-medium text-white"
            (click)="retry()"
          >
            Try again
          </button>
        </div>
      } @else if (!catalog.ready()) {
        <div class="mob:px-6 mob:pb-16 px-4 pt-5 pb-24">
          <div
            class="mob:grid-cols-[repeat(auto-fill,minmax(112px,1fr))] grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2"
          >
            @for (skeleton of skeletons; track $index) {
              <div
                class="skeleton animate-shimmer border-line mob:h-26 h-21 rounded-xl border"
                [style.opacity]="1 - $index * 0.022"
              ></div>
            }
          </div>
          <div
            class="text-soft mt-7 flex items-center justify-center gap-2.5 text-[13px]"
          >
            <ng-icon name="remixLoader4Line" size="16px" class="animate-spin" />
            <span
              >Indexing {{ iconCount }} icons across {{ setCount }} sets…</span
            >
          </div>
        </div>
      } @else if (!groups().length) {
        <div class="flex flex-col items-center px-6 py-24 text-center">
          <div
            class="border-line bg-bg-weak text-soft flex size-16 items-center justify-center rounded-[18px] border"
          >
            <ng-icon name="remixSearchLine" size="28px" />
          </div>
          <h2 class="mt-5 text-lg font-semibold tracking-[-0.014em]">
            {{ empty().title }}
          </h2>
          <p class="text-sub mt-2 max-w-95 text-sm leading-[22px]">
            {{ empty().body }}
          </p>
          @if (empty().showSuggestions) {
            <div class="mt-5 flex flex-wrap justify-center gap-2">
              @for (suggestion of suggestions; track suggestion) {
                <button
                  type="button"
                  class="border-line bg-bg-0 text-sub hover:border-line-strong hover:text-strong flex h-8 items-center rounded-full border px-3 text-[13px]"
                  (click)="setQuery(suggestion)"
                >
                  {{ suggestion }}
                </button>
              }
            </div>
          }
          @if (empty(); as empty) {
            @if (empty.action) {
              <button
                type="button"
                class="bg-primary mt-5 flex h-10 items-center rounded-[10px] px-4.5 text-sm font-medium text-white"
                (click)="searchEverything(empty.keepsQuery ?? false)"
              >
                {{ empty.action }}
              </button>
            }
          }
        </div>
      } @else {
        <div class="mob:px-6 mob:pb-16 px-4 pt-5 pb-24">
          @for (group of groups(); track group.set.slug) {
            <section class="mb-7">
              <div class="mb-2.5 flex flex-wrap items-center gap-2.5">
                <h2 class="text-[13px] font-semibold tracking-[-0.006em]">
                  {{ group.set.name }}
                </h2>
                <span
                  class="bg-bg-weak text-soft rounded-full px-1.75 py-0.5 font-mono text-[11px]"
                >
                  {{ group.total.toLocaleString() }}
                </span>
                @if (group.variants.length > 1) {
                  <div class="flex flex-wrap items-center gap-1">
                    @for (variant of group.variants; track variant.id) {
                      <button
                        type="button"
                        class="rounded-full border px-2 py-0.5 text-[11px] font-medium"
                        [class]="
                          isVariantActive(group.set.slug, variant)
                            ? 'border-primary-line bg-primary-weak text-primary'
                            : 'border-line text-soft hover:text-sub'
                        "
                        (click)="toggleVariant(group.set.slug, variant)"
                      >
                        {{ variant.id }}
                      </button>
                    }
                  </div>
                }
                <div class="bg-line h-px flex-1"></div>
                <span class="text-soft font-mono text-[11px]">
                  {{ group.set.pkg }}
                </span>
              </div>

              <!--
                Selection is a primary ring on a neutral background rather than
                a filled tint: the tint left the icon and its name sitting on
                red, and the shared hover style overrode it, so hovering the
                selected cell made it look unselected. Each state now carries
                its own hover treatment.
              -->
              <div
                class="mob:grid-cols-[repeat(auto-fill,minmax(96px,1fr))] grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2 xl:grid-cols-[repeat(auto-fill,minmax(112px,1fr))]"
              >
                @for (icon of group.icons; track icon.position) {
                  <button
                    type="button"
                    class="animate-fade-up mob:h-24 relative flex h-21 flex-col items-center justify-center gap-2.5 rounded-xl border p-2 xl:h-26"
                    [class]="
                      selectedPosition() === icon.position
                        ? 'border-primary ring-primary bg-bg-0 hover:bg-primary-weak ring-1'
                        : 'border-line bg-bg-0 hover:border-line-strong hover:bg-bg-weak'
                    "
                    [attr.aria-pressed]="selectedPosition() === icon.position"
                    (click)="select(icon.position)"
                    [title]="icon.ref.name"
                  >
                    @if (favourites.names().has(icon.ref.name)) {
                      <ng-icon
                        name="remixHeartFill"
                        size="14px"
                        class="text-primary absolute top-1.5 right-1.5"
                        aria-label="Favourite"
                      />
                    }
                    <app-svg-icon
                      [svg]="catalog.body(icon.ref)"
                      [size]="size()"
                      class="text-strong"
                    />
                    <span
                      class="max-w-full truncate font-mono text-[10px]"
                      [class]="
                        selectedPosition() === icon.position
                          ? 'text-strong'
                          : 'text-soft'
                      "
                    >
                      {{ icon.ref.name }}
                    </span>
                  </button>
                }
              </div>
            </section>
          }

          @if (hasMore()) {
            <div
              class="text-soft flex items-center justify-center gap-2.5 p-3 text-[13px]"
            >
              <ng-icon
                name="remixLoader4Line"
                size="16px"
                class="animate-spin"
              />
              <span>Loading more results…</span>
            </div>
          }
        </div>
      }
    </main>

    @if (selectedIcon(); as icon) {
      @if (!drawerOpen()) {
        <button
          type="button"
          class="animate-scrim-in fixed inset-x-0 top-16 bottom-0 z-90 bg-black/40 xl:hidden"
          (click)="clearSelection()"
          aria-label="Close details"
        ></button>
      }
      <app-icon-detail
        [icon]="icon"
        [index]="index()!"
        [position]="selectedPosition()!"
        (dismiss)="clearSelection()"
        (selected)="selectIcon($event)"
      />
    }
  `,
})
export default class BrowsePage {
  protected readonly catalog = inject(IconCatalog);
  protected readonly favourites = inject(Favourites);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly params = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });

  protected readonly index = this.catalog.index;
  protected readonly sizes = [16, 24, 32];
  protected readonly size = signal(24);
  protected readonly tab = signal<BrowseTab>('all');
  protected readonly drawerOpen = signal(false);
  protected readonly limit = signal(PAGE_SIZE);
  protected readonly suggestions = SUGGESTIONS;
  protected readonly skeletons = Array.from({ length: 30 });
  protected readonly searchPlaceholder = 'Search across selected sets…';

  /** Variants excluded by the per-group chips, keyed `slug/variant`. */
  private readonly mutedVariants = signal<ReadonlySet<string>>(new Set());

  protected readonly sets = computed(() => this.index()?.sets ?? []);

  /**
   * Library totals, measured at build time rather than derived from the loaded
   * index: they are shown while the index is still downloading, so deriving
   * them would prerender "0 icons across 0 sets".
   */
  protected readonly setCount = ICON_STATS.setCount;
  protected readonly iconCount = ICON_STATS.iconCount.toLocaleString('en-GB');

  protected readonly query = computed(() => this.params().get('q') ?? '');

  /**
   * `equal: sameSets` matters as much as the parsing. This recomputes on every
   * query-param change, so without it selecting an icon looked like a change of
   * filters and reset the paging mid-scroll.
   */
  protected readonly selected = computed<ReadonlySet<string>>(
    () => {
      const param = this.params().get('sets');
      if (param !== null) {
        return new Set(param ? param.split(',') : []);
      }
      const sets = this.sets();
      if (sets.length === 0) {
        return new Set(DEFAULT_SETS);
      }
      // Drop a default that a future release might rename away.
      const known = new Set(sets.map(set => set.slug));
      return new Set(DEFAULT_SETS.filter(slug => known.has(slug)));
    },
    { equal: sameSets },
  );

  private readonly search = computed(() => {
    const index = this.index();
    if (!index) {
      return { positions: [] as number[], synonym: null, fuzzy: false };
    }
    return searchIndex(
      index,
      {
        text: this.query(),
        sets: this.selected(),
        only: this.tab() === 'favourites' ? this.favourites.names() : undefined,
      },
      fuzzyMatcher(index),
    );
  });

  protected readonly synonym = computed(() => this.search().synonym);
  protected readonly fuzzy = computed(() => this.search().fuzzy);

  /** Results after the variant chips, before paging. */
  private readonly matches = computed(() => {
    const index = this.index();
    const muted = this.mutedVariants();
    if (!index || muted.size === 0) {
      return this.search().positions;
    }
    return this.search().positions.filter(position => {
      const icon = iconAt(index, position);
      return !muted.has(`${icon.set.slug}/${icon.variant.id}`);
    });
  });

  protected readonly total = computed(() => this.matches().length);

  private readonly allGroups = computed(() => {
    const index = this.index();
    return index ? groupBySet(index, this.matches()) : [];
  });

  /**
   * The page is divided between the sets rather than taken off the front of the
   * results, so every selected set is visible straight away rather than the
   * largest one filling the first several screens.
   *
   * Each set gets at least MIN_PER_GROUP icons, and only as many sets are shown
   * as that allows: dividing the page between 40 selected sets would otherwise
   * leave six icons each, which reads as though most icons were filtered out.
   * It also bounds the SVG data fetched, since only rendered sets are loaded.
   */
  protected readonly groups = computed(() => {
    const index = this.index();
    const groups = this.allGroups();
    if (!index || groups.length === 0) {
      return [];
    }
    const { perGroup, groupsShown } = planPage(
      this.limit(),
      groups.length,
      MIN_PER_GROUP,
    );
    return groups.slice(0, groupsShown).map(group => ({
      set: group.set,
      // Every variant the set has, so a muted chip can be switched back on.
      variants: group.set.variants,
      total: group.positions.length,
      icons: group.positions.slice(0, perGroup).map(position => ({
        position,
        ref: iconAt(index, position),
      })),
    }));
  });

  protected readonly shown = computed(() =>
    this.groups().reduce((count, group) => count + group.icons.length, 0),
  );
  protected readonly hasMore = computed(() => this.shown() < this.total());

  protected readonly selectedPosition = computed(() => {
    const index = this.index();
    const param = this.params().get('icon');
    if (!index || !param) {
      return null;
    }
    return resolveIconParam(index, param);
  });

  protected readonly selectedIcon = computed(() => {
    const index = this.index();
    const position = this.selectedPosition();
    return index && position !== null ? iconAt(index, position) : null;
  });

  /** Why the grid is empty, which decides what is worth offering. */
  protected readonly empty = computed(() =>
    emptyState({
      sets: this.selected().size,
      query: this.query(),
      totalSets: ICON_STATS.setCount,
      tab: this.tab(),
      favourites: this.favourites.count(),
    }),
  );

  /**
   * Matching favourites counted by name, not by cell.
   *
   * A saved name that exists in several sets fills a cell in each of them, so
   * counting positions could report more matches than there are favourites.
   */
  private readonly matchingFavourites = computed(() => {
    const index = this.index();
    if (!index) {
      return 0;
    }
    return new Set(this.matches().map(position => index.names[position])).size;
  });

  protected readonly resultLine = computed(() =>
    resultSummary({
      ready: this.catalog.ready(),
      tab: this.tab(),
      favourites: this.favourites.count(),
      matching:
        this.tab() === 'favourites' ? this.matchingFavourites() : this.total(),
      library: ICON_STATS.iconCount,
      sets: this.selected().size,
    }),
  );

  constructor() {
    inject(Seo).apply({
      title: 'Browse icons',
      description: `Search ${ICON_STATS.iconCount.toLocaleString('en-GB')} icons across ${ICON_STATS.setCount} sets at once. Every icon shows its import, its package and its licence.`,
      path: '/browse',
    });

    void this.catalog.load();

    // Fetch the SVGs for whatever is on screen, plus the selection.
    effect(() => {
      const icons = this.groups().flatMap(group =>
        group.icons.map(icon => icon.ref),
      );
      const selected = this.selectedIcon();
      this.catalog.loadBodies(selected ? [...icons, selected] : icons);
    });

    // A new query or filter starts paging again from the top.
    effect(() => {
      this.query();
      this.selected();
      this.tab();
      this.limit.set(PAGE_SIZE);
    });

    effect(cleanup => {
      if (!this.hasMore()) {
        return;
      }
      // ponytail: grow the page when the "loading more" row scrolls into view.
      // Rendering ~240 cells at a time keeps this well short of needing a
      // virtual scroller.
      const onScroll = () => {
        const remaining =
          document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight;
        if (remaining < 800) {
          this.limit.update(limit => limit + PAGE_SIZE);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanup(() => window.removeEventListener('scroll', onScroll));
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    if (!event.defaultPrevented && this.drawerOpen()) {
      event.preventDefault();
      this.drawerOpen.set(false);
    }
  }

  protected retry(): void {
    void this.catalog.load();
  }

  protected onQuery(event: Event): void {
    this.setQuery((event.target as HTMLInputElement).value);
  }

  /** Escape in the search box clears it, and stops there. */
  protected clearQuery(event: Event): void {
    if (this.query()) {
      event.preventDefault();
      this.setQuery('');
    }
  }

  protected setQuery(text: string): void {
    this.patch({ q: text || null });
  }

  protected toggleSet(slug: string): void {
    const selected = new Set(this.selected());
    if (selected.has(slug)) {
      selected.delete(slug);
    } else {
      selected.add(slug);
    }
    this.patch({ sets: [...selected].join(',') });
  }

  protected selectAll(all: boolean): void {
    this.patch({
      sets: all
        ? this.sets()
            .map(set => set.slug)
            .join(',')
        : '',
    });
  }

  /**
   * Selects every set, optionally keeping the query.
   *
   * "Select all N sets" and "Search all N sets" share this, but only the second
   * is a fresh start: clicking the first used to discard what had been typed,
   * which is not what a button labelled "select" should do.
   */
  protected searchEverything(keepQuery = false): void {
    this.patch({
      sets: this.sets()
        .map(set => set.slug)
        .join(','),
      ...(keepQuery ? {} : { q: null }),
    });
  }

  protected select(position: number): void {
    const index = this.index();
    if (index) {
      this.patch({ icon: iconParam(index, position) }, 'push');
    }
  }

  /** Qualified with set and variant, so a shared name opens the right icon. */
  protected selectIcon(icon: IconRef): void {
    this.patch(
      { icon: `${icon.set.slug}/${icon.variant.id}/${icon.name}` },
      'push',
    );
  }

  protected clearSelection(): void {
    this.patch({ icon: null });
  }

  protected isVariantActive(slug: string, variant: IconVariant): boolean {
    return !this.mutedVariants().has(`${slug}/${variant.id}`);
  }

  protected toggleVariant(slug: string, variant: IconVariant): void {
    const key = `${slug}/${variant.id}`;
    this.mutedVariants.update(muted => {
      const next = new Set(muted);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  /**
   * Browse state lives in the query string so a search or an icon can be
   * shared, but these are not page navigations: `scroll: 'manual'` opts each
   * one out of the router's scroll restoration, which otherwise jumped back to
   * the top of the grid on every keystroke and every icon you clicked.
   *
   * Only opening an icon adds a history entry, so Back closes the detail sheet
   * — the one change here that looks like arriving somewhere new. Typing and
   * toggling sets replace, because a per-keystroke and per-checkbox history
   * would take a dozen Backs to escape the page.
   */
  private patch(
    params: Record<string, string | null>,
    history: 'push' | 'replace' = 'replace',
  ): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: history === 'replace',
      scroll: 'manual',
    });
  }
}
