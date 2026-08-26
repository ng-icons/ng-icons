import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, PLATFORM_ID, Service } from '@angular/core';
import { storedSignal } from './local-storage';

export type Theme = 'light' | 'dark';

/**
 * The appearance toggle. The initial value is resolved by an inline script in
 * index.html before first paint; this service reads back what that decided so
 * the two never disagree, and leaves the prerendered HTML untouched.
 */
@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = storedSignal<Theme>(
    'ng-icons-theme',
    (this.isBrowser
      ? this.document.documentElement.getAttribute('data-theme')
      : null) === 'dark'
      ? 'dark'
      : 'light',
  );

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (this.isBrowser) {
        this.document.documentElement.setAttribute('data-theme', theme);
      }
    });
  }

  toggle(): void {
    this.theme.update(theme => (theme === 'dark' ? 'light' : 'dark'));
  }
}
