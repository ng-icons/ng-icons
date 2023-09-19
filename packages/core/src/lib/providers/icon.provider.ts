import {
  InjectionToken,
  Optional,
  Provider,
  SkipSelf,
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
      useFactory: (parentIcons?: Record<string, string>[]) => ({
        ...parentIcons?.reduce((acc, icons) => ({ ...acc, ...icons }), {}),
        ...icons,
      }),
      deps: [[NgIconsToken, new Optional(), new SkipSelf()]],
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
  return inject(NgIconsToken);
}
