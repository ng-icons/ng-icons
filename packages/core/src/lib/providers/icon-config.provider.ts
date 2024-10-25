import { InjectionToken, Provider, inject } from '@angular/core';
import { NgIconFeatures } from './features/features';

export interface NgIconConfig {
  /** Define the default size of icons */
  size?: string;
  /** Define the default color of icons */
  color?: string;
  /** Define the default stroke width of icons */
  strokeWidth?: string | number;
}

export const NgIconConfigToken = new InjectionToken<NgIconConfig>(
  'Ng Icon Config',
);

/**
 * Provide the configuration for the icons
 * @param config The configuration to use
 */
export function provideNgIconsConfig(
  config: Partial<NgIconConfig>,
  ...features: NgIconFeatures[]
): Provider[] {
  return [
    {
      provide: NgIconConfigToken,
      useValue: config,
    },
    features.map(feature => feature.ɵproviders),
  ];
}

/**
 * Inject the configuration for the icons
 * @returns The configuration to use
 * @internal
 */
export function injectNgIconConfig(): NgIconConfig {
  return inject(NgIconConfigToken, { optional: true }) ?? {};
}
