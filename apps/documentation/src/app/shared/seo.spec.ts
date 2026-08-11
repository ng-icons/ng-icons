import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * index.html and `seo.ts` both declare the social image.
 *
 * The static shell is what a crawler sees before Angular applies anything, and
 * the prerendered pages get their values from the constants, so the two are
 * independent sources of truth for the same fact. Regenerating the card at a
 * different size would leave one of them lying, and nothing else would notice.
 */

/** Vitest's cwd depends on how it was launched, so find the workspace root. */
const workspaceRoot = (() => {
  let dir = process.cwd();
  while (!existsSync(join(dir, 'tsconfig.base.json'))) {
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error('tsconfig.base.json not found above ' + process.cwd());
    }
    dir = parent;
  }
  return dir;
})();

const read = (path: string) => readFileSync(join(workspaceRoot, path), 'utf8');

const html = read('apps/documentation/index.html');
const seo = read('apps/documentation/src/app/shared/seo.ts');

const metaContent = (attribute: string, name: string) => {
  const pattern = new RegExp(
    `<meta[^>]*${attribute}="${name}"[^>]*content="([^"]*)"|<meta[^>]*content="([^"]*)"[^>]*${attribute}="${name}"`,
    's',
  );
  const match = pattern.exec(html.replace(/\n\s*/g, ' '));
  return match?.[1] ?? match?.[2] ?? null;
};

const constant = (key: string) =>
  new RegExp(`${key}:\\s*'([^']*)'`).exec(seo)?.[1] ??
  new RegExp(`${key}:\\s*\`([^\`]*)\``).exec(seo)?.[1] ??
  null;

describe('social image declarations', () => {
  it('agrees on the image dimensions', () => {
    expect(metaContent('property', 'og:image:width')).toBe(constant('width'));
    expect(metaContent('property', 'og:image:height')).toBe(constant('height'));
  });

  it('agrees on the card type', () => {
    expect(metaContent('name', 'twitter:card')).toBe('summary_large_image');
    expect(seo).toContain("content: 'summary_large_image'");
  });

  it('points at the same file, and one that exists', () => {
    const url = metaContent('property', 'og:image');

    expect(url).toContain('/assets/og.png');
    expect(seo).toContain('/assets/og.png');
    expect(
      existsSync(
        join(workspaceRoot, 'apps/documentation/src/public/assets/og.png'),
      ),
    ).toBe(true);
  });

  it('declares the dimensions the file actually has', () => {
    // PNG stores width and height as big-endian uint32 at byte 16 of the IHDR.
    const png = readFileSync(
      join(workspaceRoot, 'apps/documentation/src/public/assets/og.png'),
    );

    expect(String(png.readUInt32BE(16))).toBe(
      metaContent('property', 'og:image:width'),
    );
    expect(String(png.readUInt32BE(20))).toBe(
      metaContent('property', 'og:image:height'),
    );
  });
});
