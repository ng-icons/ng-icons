import {
  injectContent,
  MarkdownComponent,
  type ContentFile,
} from '@analogjs/content';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PendingTasks,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { tap } from 'rxjs';
import { withBaseHref } from '../../docs/content-links';
import { injectDocs, type DocAttributes } from '../../docs/docs-nav';
import { Seo } from '../../shared/seo';
import { provideUiIcons } from '../../shared/ui-icons';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent, NgIcon, RouterLink],
  providers: [provideUiIcons()],
  host: { class: 'contents' },
  template: `
    @if (page(); as page) {
      <div class="min-w-0 flex-1">
        <div
          class="text-soft flex flex-wrap items-center gap-2 text-[13px]"
          aria-label="Breadcrumb"
        >
          <span>Documentation</span>
          <ng-icon name="remixArrowRightSLine" size="14px" />
          <span>{{ page.section }}</span>
          <ng-icon name="remixArrowRightSLine" size="14px" />
          <span class="text-sub">{{ page.title }}</span>
        </div>

        <h1
          class="mob:text-[40px] mt-4 text-[30px] font-semibold tracking-[-0.03em] text-balance"
        >
          {{ page.title }}
        </h1>
        <p
          class="text-sub mob:text-[17px] mt-3.5 text-base leading-7 text-pretty"
        >
          {{ page.lead }}
        </p>

        <analog-markdown class="markdown block" [content]="body()" />

        <div class="border-line mt-12 flex gap-3 border-t pt-6">
          @if (previous(); as previous) {
            <a
              [routerLink]="['/docs', previous.slug]"
              class="border-line hover:bg-bg-weak flex-[0_1_calc(50%-6px)] rounded-xl border px-4 py-3.5"
            >
              <div class="text-soft text-xs">Previous</div>
              <div class="mt-0.5 text-sm font-medium">{{ previous.title }}</div>
            </a>
          }
          @if (next(); as next) {
            <a
              [routerLink]="['/docs', next.slug]"
              class="border-line hover:bg-bg-weak ml-auto flex-[0_1_calc(50%-6px)] rounded-xl border px-4 py-3.5 text-right"
            >
              <div class="text-soft text-xs">Next</div>
              <div class="mt-0.5 text-sm font-medium">{{ next.title }}</div>
            </a>
          }
        </div>
      </div>

      @if (headings().length) {
        <aside
          class="toc:block sticky top-16 hidden w-55 shrink-[4] overflow-hidden px-6 py-10"
        >
          <div
            class="text-soft text-xs font-medium tracking-[0.04em] uppercase"
          >
            On this page
          </div>
          <div class="mt-3 flex flex-col gap-2.5">
            @for (heading of headings(); track heading.id) {
              <a
                [href]="'#' + heading.id"
                class="text-[13px] leading-5"
                [class]="active() === heading.id ? 'text-strong' : 'text-sub'"
              >
                {{ heading.text }}
              </a>
            }
          </div>
        </aside>
      }
    } @else if (content()) {
      <!--
        An unknown slug still matches this route, and the content resolver
        returns a file with no frontmatter. Without this branch the docs shell
        rendered around an empty article, so a stale link looked like a page
        that had simply lost its text.
      -->
      <div class="min-w-0 flex-1">
        <h1 class="mt-4 text-[30px] font-semibold tracking-[-0.03em]">
          This page does not exist
        </h1>
        <p class="text-sub mt-3.5 text-base leading-7">
          There is no documentation page at this address. The link may be out of
          date.
        </p>
        <a
          routerLink="/docs/introduction"
          class="bg-primary mt-7 flex h-10 w-fit items-center rounded-[10px] px-4.5 text-sm font-medium text-white"
        >
          Start at the introduction
        </a>
      </div>
    }
  `,
})
export default class DocPage {
  private readonly pages = injectDocs();
  private readonly seo = inject(Seo);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Reading the markdown is asynchronous, so the prerender is held open until
   * it arrives. Without this the page would be written out empty and the
   * content would only appear after hydration.
   */
  private readonly release = inject(PendingTasks).add();

  protected readonly content = toSignal(
    injectContent<DocAttributes>(
      { param: 'slug', subdirectory: 'reference' },
      'Page not found',
    ).pipe(
      tap<ContentFile<DocAttributes | Record<string, never>>>(() =>
        this.release(),
      ),
    ),
  );

  protected readonly active = signal('');

  /**
   * The page body, with its internal links resolved against the base path.
   *
   * Content arrives as HTML rather than markdown: @analogjs/content compiles
   * each file at build time. Fixing the links here rather than in the DOM keeps
   * them right in the prerendered output too.
   */
  protected readonly body = computed(() => {
    const content = this.content()?.content;
    // Typed `string | object`; only rendered HTML is ours to rewrite.
    return typeof content === 'string'
      ? withBaseHref(content, import.meta.env.BASE_URL)
      : content;
  });

  protected readonly page = computed(() => {
    const attributes = this.content()?.attributes;
    return attributes && 'title' in attributes
      ? (attributes as DocAttributes)
      : null;
  });

  private readonly position = computed(() =>
    this.pages.findIndex(page => page.slug === this.content()?.slug),
  );

  protected readonly previous = computed(() => this.pages[this.position() - 1]);
  protected readonly next = computed(() => this.pages[this.position() + 1]);

  /** Only h2s, matching the design's single-level table of contents. */
  protected readonly headings = computed(
    () => this.content()?.toc?.filter(item => item.level === 2) ?? [],
  );

  constructor() {
    inject(DestroyRef).onDestroy(this.release);

    // A plain effect, not afterRenderEffect: this has to run while the page is
    // being prerendered, and after-render hooks don't run on the server. It
    // previously did, which left all 15 docs pages sharing index.html's title.
    effect(() => {
      const page = this.page();
      const slug = this.content()?.slug;
      if (page && slug) {
        this.seo.apply({
          title: page.title,
          description: page.lead,
          path: `/docs/${slug}`,
        });
      }
    });

    // Highlight whichever section is currently in view.
    afterRenderEffect(onCleanup => {
      const ids = this.headings().map(heading => heading.id);
      if (ids.length === 0) {
        return;
      }
      const observer = new IntersectionObserver(
        entries => {
          const visible = entries.find(entry => entry.isIntersecting);
          if (visible) {
            this.active.set(visible.target.id);
          }
        },
        { rootMargin: '-88px 0px -70% 0px' },
      );
      for (const id of ids) {
        const heading = this.host.nativeElement.querySelector(`#${id}`);
        if (heading) {
          observer.observe(heading);
        }
      }
      this.active.set(ids[0]);
      onCleanup(() => observer.disconnect());
    });
  }
}
