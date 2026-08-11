import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { IconCatalog } from '../icons/icon-catalog';
import {
  iconAt,
  matchAcrossSets,
  type IconIndex,
  type IconRef,
} from '../icons/icon-index';
import { SvgIcon } from '../icons/svg-icon';
import { Favourites } from '../shared/favourites';
import { provideUiIcons } from '../shared/ui-icons';

type Snippet = 'import' | 'template';

/**
 * The selected icon's details: a side panel from 1180px, a right-hand sheet on
 * tablets and a bottom sheet on phones, matching the redesign.
 */
@Component({
  selector: 'app-icon-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, SvgIcon],
  providers: [provideUiIcons()],
  host: {
    class:
      'fixed inset-x-0 bottom-0 z-92 h-[78vh] animate-sheet-up touch-pan-y overflow-y-auto rounded-t-[20px] border-t border-line bg-bg-0 p-5 shadow-md ' +
      'mob:top-16 mob:bottom-0 mob:right-0 mob:left-auto mob:h-auto mob:w-[min(420px,92vw)] mob:animate-sheet-right mob:rounded-none mob:border-t-0 mob:border-l ' +
      'xl:sticky xl:inset-auto xl:top-16 xl:z-40 xl:h-[calc(100vh-4rem)] xl:w-93 xl:shrink-0 xl:animate-none xl:shadow-none',
  },
  template: `
    <!-- Grab handle, phones only. -->
    <div
      class="mob:hidden -mx-5 -mt-3.5 mb-1.5 flex h-5.5 cursor-grab touch-none items-center justify-center px-5"
      (pointerdown)="startDrag($event, 'y')"
    >
      <div class="bg-line-strong h-1 w-11 rounded-full"></div>
    </div>

    <div
      class="mob:cursor-grab flex touch-none items-start gap-3 xl:cursor-default"
      (pointerdown)="startDrag($event, 'x')"
    >
      <div class="flex-1">
        <div class="text-strong font-mono text-[15px] font-medium break-all">
          {{ icon().name }}
        </div>
        <div class="mt-1.5 flex items-center gap-1.5">
          <span
            class="bg-primary-weak text-primary rounded-full px-2 py-0.5 text-xs font-medium"
          >
            {{ icon().set.name }}
          </span>
          <span class="text-soft text-xs">{{ icon().set.license }}</span>
        </div>
      </div>
      <button
        type="button"
        class="text-soft hover:bg-bg-weak flex size-7 items-center justify-center rounded-lg"
        (click)="close()"
        aria-label="Close details"
      >
        <ng-icon name="remixCloseLine" size="18px" />
      </button>
    </div>

    <div
      class="border-line bg-bg-weak text-strong mt-4 flex h-44 items-center justify-center rounded-[14px] border"
    >
      <app-svg-icon [svg]="svg()" [size]="72" />
    </div>

    <div class="mt-3 flex gap-2">
      <button
        type="button"
        class="bg-primary hover:bg-primary-hover flex h-9.5 flex-1 items-center justify-center gap-2 rounded-[10px] text-sm font-medium text-white"
        (click)="copy()"
      >
        <ng-icon
          [name]="copied() ? 'remixCheckLine' : 'remixFileCopyLine'"
          size="16px"
        />
        <span>{{ copied() ? 'Copied' : 'Copy ' + snippet() }}</span>
      </button>
      <button
        type="button"
        class="border-line text-sub hover:bg-bg-weak flex size-9.5 items-center justify-center rounded-[10px] border"
        (click)="download()"
        [disabled]="!svg()"
        aria-label="Download SVG"
      >
        <ng-icon name="remixDownloadLine" size="18px" />
      </button>
      <button
        type="button"
        class="flex size-9.5 items-center justify-center rounded-[10px] border"
        [class]="
          isFavourite()
            ? 'border-primary-line bg-primary-weak text-primary'
            : 'border-line text-sub hover:bg-bg-weak'
        "
        (click)="favourites.toggle(icon().name)"
        [attr.aria-pressed]="isFavourite()"
        aria-label="Favourite"
      >
        <ng-icon
          [name]="isFavourite() ? 'remixHeartFill' : 'remixHeartLine'"
          size="18px"
        />
      </button>
    </div>

    <div class="mt-5 flex flex-col gap-2">
      <span class="text-soft text-xs font-medium tracking-[0.04em] uppercase">
        Install
      </span>
      <div
        class="border-line bg-bg-weak text-strong flex items-center gap-2 rounded-[10px] border px-3 py-2.5 font-mono text-[12.5px]"
      >
        <span class="text-soft">$</span>
        <span class="flex-1 break-all">npm i {{ icon().set.pkg }}</span>
        <button
          type="button"
          class="text-soft"
          (click)="copyInstall()"
          aria-label="Copy install command"
        >
          <ng-icon name="remixFileCopyLine" size="16px" />
        </button>
      </div>
    </div>

    <div class="mt-5 flex flex-col gap-2">
      <div
        class="border-line bg-bg-weak flex w-fit items-center gap-0.5 rounded-[9px] border p-0.5"
      >
        @for (option of snippets; track option) {
          <button
            type="button"
            class="rounded-[7px] px-3 py-1.25 text-xs font-medium capitalize"
            [class]="
              snippet() === option
                ? 'bg-bg-0 text-strong'
                : 'text-soft hover:text-sub'
            "
            (click)="snippet.set(option)"
          >
            {{ option }}
          </button>
        }
      </div>
      <pre
        class="border-line bg-bg-weak text-sub m-0 overflow-x-auto rounded-[10px] border p-3.5 font-mono text-[12.5px] leading-5 break-words whitespace-pre-wrap"
        >{{ code() }}</pre
      >
    </div>

    @if (related().length) {
      <div class="mt-5 flex flex-col gap-2.5">
        <span class="text-soft text-xs font-medium tracking-[0.04em] uppercase">
          Same icon, other sets
        </span>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
          @for (match of related(); track match.set.slug + '/' + match.name) {
            <button
              type="button"
              class="border-line text-strong hover:bg-bg-weak flex h-18 flex-col items-center justify-center gap-1.5 rounded-[10px] border"
              (click)="selected.emit(match)"
              [title]="match.name"
            >
              <app-svg-icon [svg]="catalog.body(match)" [size]="22" />
              <span class="text-soft max-w-full truncate px-1 text-[9px]">
                {{ match.set.name }}
              </span>
            </button>
          }
        </div>
      </div>
    }
  `,
})
export class IconDetail {
  protected readonly catalog = inject(IconCatalog);
  protected readonly favourites = inject(Favourites);
  private readonly clipboard = inject(Clipboard);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly icon = input.required<IconRef>();
  readonly index = input.required<IconIndex>();
  readonly position = input.required<number>();

  readonly dismiss = output<void>();
  readonly selected = output<IconRef>();

  protected readonly snippets: Snippet[] = ['import', 'template'];
  protected readonly snippet = signal<Snippet>('import');
  protected readonly copied = signal(false);

  protected readonly svg = computed(() => this.catalog.body(this.icon()));
  protected readonly isFavourite = computed(() =>
    this.favourites.names().has(this.icon().name),
  );

  protected readonly related = computed(() =>
    matchAcrossSets(this.index(), this.position(), 8).map(position =>
      iconAt(this.index(), position),
    ),
  );

  protected readonly code = computed(() =>
    this.snippet() === 'template'
      ? `<ng-icon name="${this.icon().name}" />`
      : `import { ${this.icon().name} } from '${this.icon().variant.subpath}';`,
  );

  constructor() {
    effect(() => this.catalog.loadBodies([this.icon(), ...this.related()]));
    effect(() => {
      this.icon();
      this.copied.set(false);
    });
  }

  /**
   * Escape dismisses the sheet, the same way the close button does.
   *
   * `defaultPrevented` keeps one key press to one dismissal: the browse
   * search box marks the event handled when it clears itself, so clearing a
   * query does not also close the panel.
   */
  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    this.close();
  }

  /** Close from the button, matching the swipe motion on small screens. */
  protected close(): void {
    if (window.innerWidth >= 1180) {
      this.dismiss.emit();
      return;
    }
    this.animateOut();
  }

  protected copy(): void {
    this.clipboard.copy(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  protected copyInstall(): void {
    this.clipboard.copy(`npm i ${this.icon().set.pkg}`);
  }

  protected download(): void {
    const svg = this.svg();
    if (!svg) {
      return;
    }
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.icon().name}.svg`;

    // In the document and revoked on a later task: the download is asynchronous,
    // and revoking in the same tick cancelled it in Firefox, while a detached
    // anchor never started one at all in older Safari.
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 0);
  }

  /**
   * Swipe the sheet away: down on phones, right on tablets. Inert once the
   * panel is docked beside the results at 1180px and above.
   */
  protected startDrag(event: PointerEvent, axis: 'x' | 'y'): void {
    const node = this.host.nativeElement;
    if (event.button > 0 || window.innerWidth >= 1180) {
      return;
    }

    const vertical = window.innerWidth < 860;
    if ((vertical && axis !== 'y') || (!vertical && axis !== 'x')) {
      return;
    }

    const from = vertical ? event.clientY : event.clientX;
    const extent = vertical ? node.offsetHeight : node.offsetWidth;
    let delta = 0;
    let last = from;
    let lastAt = event.timeStamp;
    let velocity = 0;

    node.style.animation = 'none';
    node.style.transition = 'none';

    const move = (moved: PointerEvent) => {
      const now = vertical ? moved.clientY : moved.clientX;
      if (moved.timeStamp > lastAt) {
        velocity = (now - last) / (moved.timeStamp - lastAt);
      }
      last = now;
      lastAt = moved.timeStamp;
      delta = Math.max(0, now - from);
      // Resist past 60% of the sheet so it can't be dragged off screen.
      if (delta > extent * 0.6) {
        delta = extent * 0.6 + (delta - extent * 0.6) * 0.4;
      }
      node.style.transform = vertical
        ? `translateY(${delta}px)`
        : `translateX(${delta}px)`;
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);

      if (delta > extent * 0.28 || velocity > 0.7) {
        this.animateOut();
      } else {
        node.style.transition = 'transform 0.3s var(--ease-sheet)';
        node.style.transform = '';
      }
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  }

  /** Tapping the close button should leave with the same motion as a swipe. */
  private animateOut(): void {
    const node = this.host.nativeElement;
    node.style.animation = 'none';
    node.style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 1, 1)';

    // Setting the transition and the transform in one go leaves the browser a
    // single style pass, so it applies the end state without interpolating and
    // the sheet jumps off screen. Reading a layout property flushes the start
    // state first, which is what gives the transition something to animate
    // from. A drag does not need this because it has already been moving.
    void node.offsetHeight;

    node.style.transform =
      window.innerWidth < 860 ? 'translateY(100%)' : 'translateX(100%)';
    setTimeout(() => this.dismiss.emit(), 220);
  }
}
