import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconCatalog } from '../icons/icon-catalog';
import { iconAt } from '../icons/icon-index';
import { SvgIcon } from '../icons/svg-icon';
import { Seo } from '../shared/seo';
import { ICON_STATS } from '../shared/stats';

const PREVIEW_COUNT = 6;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SvgIcon],
  template: `
    <div class="mob:px-6 mob:pt-12 mob:pb-20 mx-auto max-w-295 px-5 pt-8 pb-18">
      <h1 class="mob:text-[40px] text-[30px] font-semibold tracking-[-0.03em]">
        Icon sets
      </h1>
      <p class="text-sub mt-3 max-w-140 text-base leading-[26px]">
        {{ setCount }} libraries, each published as its own package. Install
        only the sets you use.
      </p>

      <div
        class="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
      >
        @for (card of cards(); track card.set.slug) {
          <a
            [routerLink]="['/browse']"
            [queryParams]="{ sets: card.set.slug }"
            class="border-line bg-bg-0 rounded-2xl border p-5 shadow-xs hover:shadow-md"
          >
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="text-base font-semibold tracking-[-0.011em]">
                {{ card.set.name }}
              </span>
              <span class="text-soft text-xs whitespace-nowrap">
                {{ card.set.count.toLocaleString() }} icons
              </span>
            </div>
            <div class="text-sub mt-1 font-mono text-xs break-all">
              {{ card.set.pkg }}
            </div>

            <div class="text-sub mt-4.5 flex flex-wrap gap-2.5">
              @for (icon of card.preview; track icon.name) {
                <app-svg-icon [svg]="catalog.body(icon)" [size]="20" />
              }
            </div>

            <div
              class="border-line mt-4.5 flex items-center gap-2 border-t pt-3.5"
            >
              <span class="text-soft text-xs whitespace-nowrap">
                {{ card.set.license }}
              </span>
              <div class="flex-1"></div>
              <span class="text-primary text-xs font-medium">Browse →</span>
            </div>
          </a>
        }
      </div>

      @if (!cards().length) {
        <p class="text-soft mt-8 text-sm">Loading icon sets…</p>
      }
    </div>
  `,
})
export default class IconsetsPage {
  protected readonly catalog = inject(IconCatalog);
  protected readonly setCount = ICON_STATS.setCount;

  protected readonly cards = computed(() => {
    const index = this.catalog.index();
    if (!index) {
      return [];
    }
    const firstPosition = new Map<number, number>();
    for (let position = 0; position < index.setOf.length; position++) {
      const set = index.setOf[position];
      if (!firstPosition.has(set)) {
        firstPosition.set(set, position);
      }
    }

    return index.sets.map((set, setIndex) => {
      const start = firstPosition.get(setIndex) ?? 0;
      const shown = Math.min(PREVIEW_COUNT, set.count);
      return {
        set,
        preview: Array.from({ length: shown }, (_, i) =>
          iconAt(index, start + i),
        ),
      };
    });
  });

  constructor() {
    inject(Seo).apply({
      title: 'Icon sets',
      description: `All ${ICON_STATS.setCount} icon libraries available through Angular Icons, each published as its own package with its own licence.`,
      path: '/iconsets',
    });

    void this.catalog.load();
    effect(() =>
      this.catalog.loadBodies(this.cards().flatMap(card => card.preview)),
    );
  }
}
