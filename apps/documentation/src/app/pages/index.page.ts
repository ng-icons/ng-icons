import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { IconMarquee } from '../components/icon-marquee';
import { Seo, SITE_TAGLINE } from '../shared/seo';
import { ICON_STATS, Stats } from '../shared/stats';
import { provideUiIcons } from '../shared/ui-icons';

const INSTALL = 'npm i @ng-icons/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink, IconMarquee],
  providers: [provideUiIcons()],
  template: `
    <div class="mob:px-6 mob:pt-22 mx-auto max-w-280 px-5 pt-12 text-center">
      <div
        class="border-line bg-bg-0 text-sub inline-flex items-center gap-2 rounded-full border py-1 pr-1 pl-3 text-[13px] shadow-xs"
      >
        <span>The all-in-one icon library for Angular</span>
        <span
          class="bg-primary-weak text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.75 text-xs font-medium"
        >
          v{{ version }} is out
        </span>
      </div>

      <h1
        class="xs:text-[40px] mob:text-[52px] mt-6 text-[34px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance lg:text-[64px]"
      >
        Every icon set.<br />One Angular API.
      </h1>
      <p
        class="text-sub mob:text-lg mx-auto mt-5 max-w-140 text-base leading-relaxed text-pretty"
      >
        {{ iconCount }} icons from {{ setCount }} libraries, searchable
        together. Register what you use, ship nothing you don't.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a
          routerLink="/browse"
          class="bg-primary hover:bg-primary-hover flex h-11 items-center gap-2 rounded-[10px] px-5 text-[15px] font-medium text-white shadow-xs"
        >
          <ng-icon name="remixSearchLine" size="18px" />
          <span>Browse icons</span>
        </a>
        <a
          routerLink="/docs/installation"
          class="border-line bg-bg-0 text-strong hover:bg-bg-weak flex h-11 items-center gap-2 rounded-[10px] border px-5 text-[15px] font-medium shadow-xs"
        >
          Get started
        </a>
      </div>

      <div
        class="border-line bg-bg-weak text-sub xs:text-sm mt-6 inline-flex max-w-full items-center gap-3 rounded-xl border p-2.5 pl-4 font-mono text-xs"
      >
        <span class="text-soft">$</span>
        <span class="text-strong">{{ install }}</span>
        <button
          type="button"
          class="border-line bg-bg-0 text-sub flex size-7 items-center justify-center rounded-md border"
          (click)="copyInstall()"
          [attr.aria-label]="copied() ? 'Copied' : 'Copy install command'"
        >
          <ng-icon
            [name]="copied() ? 'remixCheckLine' : 'remixFileCopyLine'"
            size="16px"
          />
        </button>
      </div>
    </div>

    <app-icon-marquee class="mob:mt-18 mt-11" />

    <div class="mx-auto max-w-280 px-6 pt-6">
      <div
        class="border-line bg-bg-0 mob:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] overflow-hidden rounded-[20px] border"
      >
        @for (feature of features; track feature.title) {
          <div class="border-line border-b p-7 not-last:border-r">
            <ng-icon [name]="feature.icon" size="20px" class="text-primary" />
            <h3
              class="mt-3.5 mb-1.5 text-[15px] font-semibold tracking-[-0.011em]"
            >
              {{ feature.title }}
            </h3>
            <p
              class="text-sub text-sm leading-[22px]"
              [innerHTML]="feature.body"
            ></p>
          </div>
        }
      </div>
    </div>

    <div class="mx-auto max-w-280 px-6 pt-16">
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-10"
      >
        <div>
          <h2
            class="mob:text-4xl text-[28px] leading-tight font-semibold tracking-[-0.028em]"
          >
            Register what you use.<br />Ship nothing else.
          </h2>
          <p
            class="text-sub mt-4 max-w-110 text-base leading-[26px] text-pretty"
          >
            Icons are plain constants. Import them where you need them and the
            bundler drops the rest. No sprite sheets, no font files, no runtime
            registry to maintain.
          </p>
          <div class="mt-7 flex flex-wrap gap-7">
            <div>
              <div class="text-[28px] font-semibold tracking-[-0.02em]">
                {{ iconCount }}
              </div>
              <div class="text-soft mt-0.5 text-[13px]">icons</div>
            </div>
            <div>
              <div class="text-[28px] font-semibold tracking-[-0.02em]">
                {{ setCount }}
              </div>
              <div class="text-soft mt-0.5 text-[13px]">icon sets</div>
            </div>
            <div>
              <div class="text-[28px] font-semibold tracking-[-0.02em]">
                MIT
              </div>
              <div class="text-soft mt-0.5 text-[13px]">licensed core</div>
            </div>
          </div>
        </div>

        <div
          class="border-line bg-bg-0 overflow-hidden rounded-2xl border shadow-md"
        >
          <div
            class="border-line bg-bg-weak flex h-11 items-center gap-2 border-b px-3.5"
          >
            <span class="bg-line-strong size-2.5 rounded-full"></span>
            <span class="text-soft ml-1.5 font-mono text-xs">app.ts</span>
          </div>
          <pre
            class="text-sub m-0 overflow-x-auto p-5 font-mono text-[13px] leading-[22px]"
          ><span class="text-accent-purple">import</span> &#123; NgIcon, provideIcons &#125; <span class="text-accent-purple">from</span> <span class="text-accent-green">'&#64;ng-icons/core'</span>;
<span class="text-accent-purple">import</span> &#123; remixSearchLine &#125; <span class="text-accent-purple">from</span> <span class="text-accent-green">'&#64;ng-icons/remixicon'</span>;

&#64;Component(&#123;
  imports: [NgIcon],
  providers: [provideIcons(&#123; remixSearchLine &#125;)],
  template: <span class="text-accent-green">\`&lt;ng-icon name="remixSearchLine" /&gt;\`</span>,
&#125;)
<span class="text-accent-purple">export class</span> <span class="text-strong">App</span> &#123;&#125;</pre>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-24 flex max-w-280 flex-col items-center gap-12 px-6">
      <div class="flex max-w-140 flex-col items-center gap-4">
        <span
          class="border-line text-sub inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
        >
          <span class="bg-primary size-1.5 rounded-full"></span>
          Trusted in production
        </span>
        <span
          class="text-sub mob:text-2xl text-center text-[19px] leading-[1.34] font-medium tracking-[-0.005em] text-pretty"
        >
          Downloaded by Angular teams every day, and growing with every release.
        </span>
      </div>

      <div
        class="mob:gap-12 mob:text-left flex w-full flex-wrap items-center justify-center gap-7 text-center"
      >
        <div class="flex flex-col gap-1">
          <span
            class="mob:text-[56px] text-[40px] leading-[1.14] font-medium tracking-[-0.01em] whitespace-nowrap"
          >
            {{ stats.weekly() }}
          </span>
          <span class="text-sub text-sm leading-5 tracking-[-0.006em]">
            weekly npm downloads
          </span>
        </div>
        <div class="bg-line mob:block hidden h-14 w-px"></div>
        <div class="flex flex-col gap-1">
          <span
            class="mob:text-[56px] text-[40px] leading-[1.14] font-medium tracking-[-0.01em]"
          >
            {{ stats.lifetime() }}
          </span>
          <span class="text-sub text-sm leading-5 tracking-[-0.006em]">
            downloads all time
          </span>
        </div>
        <div class="bg-line mob:block hidden h-14 w-px"></div>
        <div class="flex flex-col gap-1">
          <span
            class="mob:text-[56px] text-[40px] leading-[1.14] font-medium tracking-[-0.01em]"
          >
            {{ stats.stars() }}
          </span>
          <span class="text-sub text-sm leading-5 tracking-[-0.006em]">
            stars on GitHub
          </span>
        </div>
      </div>

      <div
        class="border-line bg-bg-0 mob:rounded-full flex flex-wrap items-center justify-center gap-3 rounded-2xl border px-4 py-3 shadow-xs"
      >
        <ng-icon name="remixHeartFill" size="18px" class="text-primary" />
        <span class="text-sub text-sm"
          >MIT licensed and funded by its sponsors.</span
        >
        <a
          href="https://github.com/sponsors/ashley-hunter"
          class="text-primary text-sm font-medium"
        >
          Become a sponsor
        </a>
      </div>
    </div>

    <footer
      class="border-line mx-auto mt-16 flex max-w-280 flex-wrap items-center gap-6 border-t px-6 pt-8 pb-14"
    >
      <span class="text-soft text-[13px]">
        MIT licensed. Built by the Angular community.
      </span>
      <div class="flex-1"></div>
      <div class="flex gap-5 text-[13px]">
        @for (link of footerLinks; track link.href) {
          <a
            [href]="link.href"
            class="text-sub hover:text-strong"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }}
          </a>
        }
      </div>
    </footer>
  `,
})
export default class IndexPage {
  protected readonly stats = inject(Stats);
  private readonly clipboard = inject(Clipboard);

  protected readonly install = INSTALL;
  protected readonly copied = signal(false);

  protected readonly version = ICON_STATS.version.split('.')[0];
  protected readonly setCount = ICON_STATS.setCount;
  protected readonly iconCount = ICON_STATS.iconCount.toLocaleString('en-GB');

  protected readonly features = [
    {
      icon: 'remixSearchLine',
      title: `One component, ${ICON_STATS.setCount} sets`,
      body: `Mix Heroicons, Lucide, Material and ${ICON_STATS.setCount - 3} more in the same template. They all render through a single <span class="font-mono text-[13px]">&lt;ng-icon&gt;</span>.`,
    },
    {
      icon: 'remixBracesLine',
      title: 'Fully tree-shakeable',
      body: 'Each set is its own package and each icon its own export. Register icons with <span class="font-mono text-[13px]">provideIcons</span> and only those reach your bundle.',
    },
    {
      icon: 'remixEqualizerLine',
      title: 'Size, colour and stroke',
      body: 'Inputs on the component, inheriting font size and text colour by default. <span class="font-mono text-[13px]">strokeWidth</span> applies to sets drawn with strokes.',
    },
    {
      icon: 'remixDownloadLine',
      title: 'Icon loaders',
      body: 'Resolve icons at runtime from a URL or generate them on the fly. Loaders run in the injection context, and <span class="font-mono text-[13px]">withCaching()</span> stops repeat requests.',
    },
    {
      icon: 'remixAngularjsFill',
      title: 'Built for modern Angular',
      body: 'Standalone components, signals and the current release line. Register icons with <span class="font-mono text-[13px]">provideIcons</span> anywhere providers are accepted.',
    },
    {
      icon: 'remixCodeSLine',
      title: 'Bring your own SVGs',
      body: 'Set the <span class="font-mono text-[13px]">svg</span> input to any SVG string and skip registration entirely. Strict CSP is supported too.',
    },
  ];

  protected readonly footerLinks = [
    { href: 'https://github.com/ng-icons/ng-icons', label: 'GitHub' },
    { href: 'https://www.npmjs.com/package/@ng-icons/core', label: 'npm' },
    {
      href: 'https://github.com/ng-icons/ng-icons/releases',
      label: 'Changelog',
    },
    { href: 'https://github.com/sponsors/ashley-hunter', label: 'Sponsor' },
  ];

  constructor() {
    this.stats.load();
    inject(Seo).apply({
      description: `${SITE_TAGLINE} ${this.iconCount} icons from ${this.setCount} libraries, searchable together and fully tree-shakeable.`,
      path: '/',
    });
  }

  protected copyInstall(): void {
    // `copy` reports whether the write actually happened. Claiming "Copied"
    // regardless told the reader the command was on their clipboard when a
    // permission prompt or an unsupported browser had refused it.
    if (!this.clipboard.copy(this.install)) {
      return;
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
