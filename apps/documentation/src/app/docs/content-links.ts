/**
 * Root-absolute links written in markdown do not know about the base path.
 *
 * The site is served from a subdirectory, so `[icon sets](/iconsets)` becomes
 * `href="/iconsets"` and sends the reader to the host root, which on GitHub
 * Pages belongs to somebody else. `APP_BASE_HREF` does not help: content
 * markdown produces plain anchors, not router links.
 *
 * The rewrite happens on the rendered HTML because that is what there is to
 * work with. @analogjs/content compiles each markdown file to HTML at build
 * time, so `injectContent` hands over `<a href="/iconsets">`, never the
 * original `](/iconsets)`. Doing it here rather than in the DOM keeps the fix
 * in the prerendered HTML, where crawlers and no-JS readers see it.
 */

/**
 * A `href` or `src` whose value starts a path at the root.
 *
 * `//host/path` is excluded because it is protocol-relative, and so already
 * absolute. Paths shown inside code samples are safe: the renderer escapes
 * their quotes, so `href=&quot;/x&quot;` does not match.
 */
const ROOT_ATTRIBUTE = /\b(href|src)="\/(?!\/)/g;

/** Prefixes root-absolute links in rendered content with the base path. */
export function withBaseHref(html: string, base: string): string {
  const prefix = base.endsWith('/') ? base : `${base}/`;

  if (prefix === '/') {
    return html;
  }

  return html.replace(ROOT_ATTRIBUTE, `$1="${prefix}`);
}
