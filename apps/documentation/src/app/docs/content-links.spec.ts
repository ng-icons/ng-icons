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

  it('does not match an attribute that merely ends in href', () => {
    const html = '<a data-xhref="/browse">x</a>';

    expect(withBaseHref(html, BASE)).toBe(html);
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
