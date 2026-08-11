import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The text the catch-all page renders, which no real page should contain.
 */
export const NOT_FOUND_MARKER = 'This page does not exist';

/**
 * index.html's title, before any page replaces it.
 *
 * Every page calls `Seo.apply`, and doing so during the prerender is the only
 * way the tag reaches the static HTML. A page still carrying this title has not
 * rendered its own content — which is what a blank docs page looked like.
 */
export const DEFAULT_TITLE = 'Angular Icons';

/** The route whose output becomes `404.html`. */
const NOT_FOUND_ROUTE = '/404';

/** The home page is the one place the bare site title is the right answer. */
const HOME_ROUTE = '/';

/**
 * The things the prerendered output needs that Analog does not do itself.
 *
 * Runs from nitro's `prerender:done` hook, the first point at which every page
 * has been written.
 */
export function postPrerender(
  publicDir: string,
  routes: string[],
  /** The sitemap host, so the 404 entry can be matched exactly. */
  siteUrl: string,
): void {
  writeNotFoundPage(publicDir);
  assertPagesRendered(publicDir, routes);
  rewriteSitemap(publicDir, siteUrl);
}

/**
 * GitHub Pages answers any path without a file of its own with `/404.html`, so
 * the catch-all route is prerendered as `404/index.html` and copied to where
 * Pages will look for it.
 */
function writeNotFoundPage(publicDir: string): void {
  const source = pageFile(publicDir, NOT_FOUND_ROUTE);

  if (!existsSync(source)) {
    // Loud, because the failure mode is a silent fallback to GitHub's own 404
    // page on every mistyped link.
    throw new Error(
      `Expected a prerendered 404 at ${source}. Is '${NOT_FOUND_ROUTE}' still in the prerender routes?`,
    );
  }

  copyFileSync(source, join(publicDir, '404.html'));
}

function assertPagesRendered(publicDir: string, routes: string[]): void {
  const pages = routes
    .filter(route => route !== NOT_FOUND_ROUTE)
    .map(route => {
      const file = pageFile(publicDir, route);
      return {
        route,
        html: existsSync(file) ? readFileSync(file, 'utf8') : null,
      };
    });

  const problems = findBrokenPages(pages);

  if (problems.length > 0) {
    throw new Error(
      `The prerendered site has pages that did not render:\n${problems
        .map(problem => `  ${problem.route}: ${problem.reason}`)
        .join('\n')}`,
    );
  }
}

export interface PrerenderedPage {
  route: string;
  /** null when nothing was written for the route at all. */
  html: string | null;
}

export interface BrokenPage {
  route: string;
  reason: string;
}

/**
 * Checks that every route produced a page of its own.
 *
 * Nitro's `failedRoutes` does not cover any of this. A route can render
 * "successfully" and still be useless: it can fall through to the catch-all, or
 * render the layout around content that never arrived. Both have shipped, and
 * both look fine from the build log.
 */
export function findBrokenPages(pages: PrerenderedPage[]): BrokenPage[] {
  const problems: BrokenPage[] = [];

  for (const { route, html } of pages) {
    if (html === null) {
      problems.push({ route, reason: 'nothing was written for it' });
      continue;
    }

    if (html.includes(NOT_FOUND_MARKER)) {
      problems.push({ route, reason: 'it rendered the 404 page' });
      continue;
    }

    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim();

    if (!title) {
      problems.push({ route, reason: 'it has no title' });
    } else if (route !== HOME_ROUTE && title === DEFAULT_TITLE) {
      problems.push({
        route,
        reason: `its title is still index.html's "${DEFAULT_TITLE}", so the page never applied its own`,
      });
    }
  }

  return problems;
}

/** Where the prerender writes a route, e.g. `/browse` -> `browse/index.html`. */
function pageFile(publicDir: string, route: string): string {
  return join(publicDir, route.replace(/^\//, ''), 'index.html');
}

function rewriteSitemap(publicDir: string, siteUrl: string): void {
  const path = join(publicDir, 'sitemap.xml');

  if (!existsSync(path)) {
    return;
  }

  const notFoundUrl = `${siteUrl.replace(/\/$/, '')}${NOT_FOUND_ROUTE}`;

  writeFileSync(path, fixSitemap(readFileSync(path, 'utf8'), notFoundUrl));
}

/**
 * Corrects the sitemap Analog generates.
 *
 * Two problems: it declares the namespace as `https://www.sitemaps.org/...`
 * where the schema is published under `http://`, which strict validators treat
 * as an unrecognised document; and every prerendered route becomes an entry,
 * including the 404 page, which should never be offered for indexing.
 */
export function fixSitemap(xml: string, notFoundUrl: string): string {
  return xml
    .replace(
      'https://www.sitemaps.org/schemas/sitemap/0.9',
      'http://www.sitemaps.org/schemas/sitemap/0.9',
    )
    .replace(urlEntry(notFoundUrl), '');
}

/**
 * Matches the one `<url>` entry whose `<loc>` is exactly this URL.
 *
 * Matching on a trailing `/404` instead would also drop a real page that
 * happened to live at `/docs/404`.
 */
function urlEntry(loc: string): RegExp {
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, 'g');
}
