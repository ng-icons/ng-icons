/**
 * Absolute URL for a file in `src/public`.
 *
 * The site is published under /ng-icons/ on GitHub Pages and the docs routes
 * are nested, so relative asset paths would resolve against the current page.
 * Vite substitutes `BASE_URL` at build time.
 */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const LOGO = assetUrl('assets/logo.svg');
