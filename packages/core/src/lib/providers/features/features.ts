import { InjectionToken, Provider, inject } from '@angular/core';

export type ContentSecurityPolicyFeature =
  NgIconFeature<NgIconFeatureKind.ContentSecurityPolicyFeature>;

export type NgIconFeatures = ContentSecurityPolicyFeature;

/**
 * The list of features as an enum to uniquely type each feature.
 */
export const enum NgIconFeatureKind {
  ContentSecurityPolicyFeature,
}

/**
 * Helper type to represent a feature.
 */
export interface NgIconFeature<FeatureKind extends NgIconFeatureKind> {
  ɵkind: FeatureKind;
  ɵproviders: Provider[];
}

/**
 * Helper function to create an object that represents a feature.
 */
export function createFeature<FeatureKind extends NgIconFeatureKind>(
  kind: FeatureKind,
  providers: Provider[],
): NgIconFeature<FeatureKind> {
  return { ɵkind: kind, ɵproviders: providers };
}

export type NgIconPreProcessor = (icon: string) => string;
export type NgIconPostProcessor = (element: HTMLElement) => void;

export const NgIconPreProcessorToken = new InjectionToken<NgIconPreProcessor>(
  'Ng Icon Pre Processor',
);

export const NgIconPostProcessorToken = new InjectionToken<NgIconPostProcessor>(
  'Ng Icon Post Processor',
);

export function injectNgIconPreProcessor(): NgIconPreProcessor {
  return inject(NgIconPreProcessorToken, { optional: true }) ?? (icon => icon);
}

export function injectNgIconPostProcessor(): NgIconPostProcessor {
  return inject(NgIconPostProcessorToken, { optional: true }) ?? (() => {});
}
