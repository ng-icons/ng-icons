import {
  InjectionToken,
  Provider,
  inject,
} from '@angular/core';

/**
 * Define the icons to use
 * @param icons The icons to provide
 */
export function provideIcons(icons: Record<string, string>): Provider[] {
  return [
    {
      provide: NgIconsToken,
      useFactory: (parentIcons = inject<Record<string, string>[]>(NgIconsToken, { optional: true, skipSelf: true})) => ({
        ...parentIcons?.reduce((acc, icons) => ({ ...acc, ...icons }), {}),
        ...icons,
      }),
      multi: true,
    },
  ];
}

export const NgIconsToken = new InjectionToken<Record<string, string>[]>(
  'Icons Token',
);

/**
 * Inject the icons to use
 * @returns The icons to use
 * @internal
 */
export function injectNgIcons(): Record<string, string>[] {
  return inject(NgIconsToken, { optional: true }) ?? [];
}
