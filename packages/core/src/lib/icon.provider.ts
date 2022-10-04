import { InjectionToken, Optional, Provider, SkipSelf } from '@angular/core';

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
