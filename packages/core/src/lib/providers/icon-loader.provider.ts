import { inject, InjectionToken, Provider } from '@angular/core';
import type { Observable } from 'rxjs';

export type NgIconLoader = (
  name: string,
) => Promise<string> | Observable<string> | string;

export const NgIconLoaderToken = new InjectionToken<NgIconLoader>(
  'Ng Icon Loader Token',
);

/**
 * The list of features as an enum to uniquely type each feature.
 */
const enum NgIconLoaderFeatureKind {
  CachingFeature,
}

interface NgIconLoaderFeature<FeatureKind extends NgIconLoaderFeatureKind> {
  kind: FeatureKind;
  providers: Provider[];
}

/**
 * Helper function to create an object that represents a Loader feature.
 */
function loaderFeature<FeatureKind extends NgIconLoaderFeatureKind>(
  kind: FeatureKind,
  providers: Provider[],
): NgIconLoaderFeature<FeatureKind> {
  return { kind: kind, providers: providers };
}

type CachingFeature =
  NgIconLoaderFeature<NgIconLoaderFeatureKind.CachingFeature>;

type NgIconLoaderFeatures = CachingFeature;

export type NgIconLoaderCache = Map<string, string | Promise<string>>;

export const NgIconCacheToken = new InjectionToken<NgIconLoaderCache>(
  'Ng Icon Cache Token',
);

/**
 * Add caching to the loader. This will prevent the loader from being called multiple times for the same icon name.
 */
export function withCaching(): CachingFeature {
  return loaderFeature(NgIconLoaderFeatureKind.CachingFeature, [
    { provide: NgIconCacheToken, useValue: new Map<string, string>() },
  ]);
}

/**
 * Provide a function that will return the SVG content for a given icon name.
 * @param loader The function that will return the SVG content for a given icon name.
 * @param features The list of features to apply to the loader.
 * @returns The SVG content for a given icon name.
 */
export function provideNgIconLoader(
  loader: NgIconLoader,
  ...features: NgIconLoaderFeatures[]
) {
  return [
    { provide: NgIconLoaderToken, useValue: loader },
    features.map(feature => feature.providers),
  ];
}

/**
 * Inject the function that will return the SVG content for a given icon name.
 */
export function injectNgIconLoader(): NgIconLoader | null {
  return inject(NgIconLoaderToken, { optional: true });
}

/**
 * Inject the cache that will store the SVG content for a given icon name.
 */
export function injectNgIconLoaderCache(): NgIconLoaderCache | null {
  return inject(NgIconCacheToken, { optional: true });
}
