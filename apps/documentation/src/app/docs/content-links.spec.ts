import { describe, expect, it } from 'vitest';
import { withBaseHref } from './content-links';

const BASE = '/ng-icons/';

describe('withBaseHref', () => {
  it('prefixes a root-absolute link', () => {
    expect(
      withBaseHref('See the <a href="/iconsets">icon sets page</a>.', BASE),
    ).toBe('See the <a href="/ng-icons/iconsets">icon sets page</a>.');
  });

  it('prefixes every link in the document', () => {
    expect(
      withBaseHref(
        '<a href="/docs/tailwind">a</a><a href="/browse">b</a>',
        BASE,
      ),
    ).toBe(
      '<a href="/ng-icons/docs/tailwind">a</a><a href="/ng-icons/browse">b</a>',
    );
  });

  it('prefixes src as well as href', () => {
    expect(withBaseHref('<img src="/assets/logo.svg" alt="">', BASE)).toBe(
      '<img src="/ng-icons/assets/logo.svg" alt="">',
    );
  });

  it('leaves absolute and protocol-relative URLs alone', () => {
    const html =
      '<a href="https://npmjs.com">n</a><a href="//cdn.example.com/x">c</a><a href="mailto:a@b.c">m</a>';

    expect(withBaseHref(html, BASE)).toBe(html);
  });

  it('leaves relative links and in-page anchors alone', () => {
    const html = '<a href="tailwind">a</a><a href="#usage">b</a>';

    expect(withBaseHref(html, BASE)).toBe(html);
  });

  /**
   * The renderer escapes quotes inside code samples, so a path being *shown*
   * never looks like an attribute to rewrite.
   */
  it('does not touch paths shown inside code samples', () => {
    const html =
      '<pre><code>&lt;a href=&quot;/iconsets&quot;&gt;</code></pre><a href="/browse">real</a>';

    expect(withBaseHref(html, BASE)).toBe(
      '<pre><code>&lt;a href=&quot;/iconsets&quot;&gt;</code></pre><a href="/ng-icons/browse">real</a>',
    );
  });

  /**
   * These are the cases a `\b` boundary let through. `-` and `:` are non-word
   * characters, so the boundary matched before the `h` and the value was
   * rewritten. The original test only used `data-xhref`, where a word character
   * precedes `href` and the boundary genuinely blocked it, so it passed while
   * the real cases were broken.
   */
  it.each([
    ['data-href', '<a data-href="/browse">x</a>'],
    ['xlink:href', '<use xlink:href="/icon.svg#a" />'],
    ['data-src', '<img data-src="/assets/a.png" alt="">'],
    ['my:src', '<x my:src="/a" />'],
  ])(
    'does not rewrite %s, which only ends in a real attribute name',
    (_name, html) => {
      expect(withBaseHref(html, BASE)).toBe(html);
    },
  );

  it('still rewrites the real attribute beside one that looks like it', () => {
    expect(
      withBaseHref('<a data-href="/keep" href="/change">x</a>', BASE),
    ).toBe('<a data-href="/keep" href="/ng-icons/change">x</a>');
  });

  it('rewrites an attribute at the start of a multi-line tag', () => {
    const html = '<a\n  href="/browse"\n  class="x"\n>b</a>';

    expect(withBaseHref(html, BASE)).toBe(
      '<a\n  href="/ng-icons/browse"\n  class="x"\n>b</a>',
    );
  });

  /** In dev the base is the root, so there is nothing to add. */
  it('is a no-op at the site root', () => {
    const html = '<a href="/iconsets">i</a>';

    expect(withBaseHref(html, '/')).toBe(html);
  });

  it('copes with a base that has no trailing slash', () => {
    expect(withBaseHref('<a href="/browse">b</a>', '/ng-icons')).toBe(
      '<a href="/ng-icons/browse">b</a>',
    );
  });
});
