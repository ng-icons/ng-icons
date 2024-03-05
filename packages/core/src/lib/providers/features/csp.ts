import { InjectionToken, inject } from '@angular/core';
import {
  ContentSecurityPolicyFeature,
  NgIconFeatureKind,
  createFeature,
} from './features';

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

function preprocessIcon(icon: string): string {
  // rename all style attributes to data-style to avoid being blocked by the CSP
  return icon.replace(/style\s*=/g, 'data-style=');
}

function postprocessIcon(element: HTMLElement): void {
  // find all elements with a data-style attribute and get the styles from it
  // and apply them to the element using the style property and remove the data-style attribute
  const elements = element.querySelectorAll<HTMLElement>('[data-style]');

  for (const element of Array.from(elements)) {
    const styles = element.getAttribute('data-style');

    styles?.split(';').forEach(style => {
      const [property, value] = style.split(':');
      element.style[property.trim() as any] = value.trim();
    });

    element.removeAttribute('data-style');
  }
}

/**
 * Process icons in a way that is compliant with the content security policy
 */
export function withContentSecurityPolicy(): ContentSecurityPolicyFeature {
  return createFeature(NgIconFeatureKind.ContentSecurityPolicyFeature, [
    { provide: NgIconPreProcessorToken, useValue: preprocessIcon },
    { provide: NgIconPostProcessorToken, useValue: postprocessIcon },
  ]);
}
