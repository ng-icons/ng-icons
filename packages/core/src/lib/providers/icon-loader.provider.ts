import { InjectionToken, inject } from '@angular/core';
import type { Observable } from 'rxjs';

export type NgIconLoader = (
  name: string,
) => Promise<string> | Observable<string> | string;

export const NgIconLoaderToken = new InjectionToken<NgIconLoader>(
  'Ng Icon Loader Token',
);

/**
 * Provide a function that will return the SVG content for a given icon name.
 * @param loader The function that will return the SVG content for a given icon name.
 * @returns The SVG content for a given icon name.
 */
export function provideNgIconLoader(loader: NgIconLoader) {
  return { provide: NgIconLoaderToken, useValue: loader };
}

/**
 * Inject the function that will return the SVG content for a given icon name.
 */
export function injectNgIconLoader(): NgIconLoader | null {
  return inject(NgIconLoaderToken, { optional: true });
}
