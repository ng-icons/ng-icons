import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Seo } from '../shared/seo';
import { provideUiIcons } from '../shared/ui-icons';

/**
 * Everything that matches no other route.
 *
 * Analog turns `[...not-found]` into Angular's `**`, and the prerender writes it
 * to `404/index.html`, which the build then copies to the `404.html` GitHub
 * Pages serves for any path that has no file of its own. So this covers both a
 * mistyped deep link and a client-side navigation to nowhere.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, RouterLink],
  providers: [provideUiIcons()],
  template: `
    <div
      class="mx-auto flex max-w-150 flex-col items-center px-6 py-28 text-center"
    >
      <div
        class="border-line bg-bg-weak text-soft flex size-16 items-center justify-center rounded-[18px] border"
      >
        <ng-icon name="remixCompass3Line" size="28px" />
      </div>
      <p class="text-soft mt-6 font-mono text-[13px]">404</p>
      <h1 class="mt-1.5 text-2xl font-semibold tracking-[-0.02em]">
        This page does not exist
      </h1>
      <p class="text-sub mt-3 text-sm leading-[22px]">
        The link may be out of date. The icon browser and the documentation are
        both a click away.
      </p>
      <div class="mt-7 flex flex-wrap justify-center gap-2.5">
        <a
          routerLink="/browse"
          class="bg-primary flex h-10 items-center rounded-[10px] px-4.5 text-sm font-medium text-white"
        >
          Browse icons
        </a>
        <a
          routerLink="/docs"
          class="border-line bg-bg-0 text-strong hover:border-line-strong flex h-10 items-center rounded-[10px] border px-4.5 text-sm font-medium"
        >
          Documentation
        </a>
      </div>
    </div>
  `,
})
export default class NotFoundPage {
  constructor() {
    inject(Seo).apply({
      title: 'Page not found',
      description: 'That page does not exist.',
      path: '/404',
    });
  }
}
