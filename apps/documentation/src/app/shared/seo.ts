import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_NAME = 'Angular Icons';
export const SITE_URL = 'https://ng-icons.github.io/ng-icons';
export const SITE_TAGLINE = 'Every icon set. One Angular API.';

/** The card image shared links show. Dimensions are the file's own. */
const OG_IMAGE = {
  url: `${SITE_URL}/assets/logo.png`,
  width: '1102',
  height: '894',
  alt: `${SITE_NAME} logo`,
};

export interface PageSeo {
  /** Page title, without the site name. Omit on the home page. */
  title?: string;
  description: string;
  /** Path from the site root, e.g. `/browse`. */
  path: string;
}

/**
 * Sets the per-page title, description, canonical URL and social tags.
 *
 * Called from each page's constructor rather than an `afterRender` hook, so the
 * tags are in place while the page is being prerendered. Anything set after
 * hydration is invisible to crawlers and to the services that unfurl links,
 * which is how every route ended up sharing the index.html title.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply({ title, description, path }: PageSeo): void {
    const pageTitle = title
      ? `${title} · ${SITE_NAME}`
      : `${SITE_NAME} · ${SITE_TAGLINE}`;
    const url = `${SITE_URL}${path === '/' ? '' : path}`;

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE.url });
    this.meta.updateTag({
      property: 'og:image:width',
      content: OG_IMAGE.width,
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: OG_IMAGE.height,
    });
    this.meta.updateTag({ property: 'og:image:alt', content: OG_IMAGE.alt });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE.url });

    this.setCanonical(url);
  }

  /** Meta has no API for link tags, so this one is managed by hand. */
  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
