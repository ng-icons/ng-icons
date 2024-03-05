import { Provider } from '@angular/core';

export type ContentSecurityPolicyFeature =
  NgIconFeature<NgIconFeatureKind.ContentSecurityPolicyFeature>;

export type ExceptionLoggerFeature =
  NgIconFeature<NgIconFeatureKind.ExceptionLoggerFeature>;

export type NgIconFeatures =
  | ContentSecurityPolicyFeature
  | ExceptionLoggerFeature;

/**
 * The list of features as an enum to uniquely type each feature.
 */
export const enum NgIconFeatureKind {
  ContentSecurityPolicyFeature,
  ExceptionLoggerFeature,
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
