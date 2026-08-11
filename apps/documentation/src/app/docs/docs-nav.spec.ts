import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { toSections, type DocPage } from './doc-page';

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

const contentDir = join(
  workspaceRoot,
  'apps/documentation/src/content/reference',
);
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'));

describe('documentation content', () => {
  /**
   * @analogjs/content 2.6.4 normalises its content-file keys with a greedy
   * `/^(?:.*)\/content/` replace. A file named `content-*.md` contains a second
   * `/content`, so the key is rewritten to `/src/content-*.md`, the lookup
   * misses and the page silently renders empty. `content-security-policy.md`
   * hit this, which is why that page is `security-policy.md`.
   */
  it('has no filename that would collide with the content directory', () => {
    expect(files.filter(file => file.startsWith('content'))).toEqual([]);
  });

  it('gives every page the frontmatter the docs pages read', () => {
    for (const file of files) {
      const frontmatter = readFileSync(join(contentDir, file), 'utf8');
      expect(frontmatter, file).toMatch(/^---\n/);
      for (const key of ['title', 'section', 'lead', 'order']) {
        expect(frontmatter, `${file} is missing ${key}`).toMatch(
          new RegExp(`^${key}: \\S`, 'm'),
        );
      }
    }
  });

  it('numbers the pages uniquely so prev/next is unambiguous', () => {
    const orders = files.map(file => {
      const match = /^order: (\d+)$/m.exec(
        readFileSync(join(contentDir, file), 'utf8'),
      );
      return match ? Number(match[1]) : NaN;
    });

    expect(orders).not.toContain(NaN);
    expect(new Set(orders).size).toBe(files.length);
  });
});

describe('toSections', () => {
  const page = (title: string, section: string, order: number): DocPage => ({
    title,
    section,
    order,
    lead: '',
    slug: title.toLowerCase(),
  });

  it('groups consecutive pages by section, keeping reading order', () => {
    const sections = toSections([
      page('Introduction', 'Getting started', 1),
      page('Installation', 'Getting started', 2),
      page('Logging', 'Configuration', 3),
    ]);

    expect(sections.map(section => section.label)).toEqual([
      'Getting started',
      'Configuration',
    ]);
    expect(sections[0].pages.map(p => p.title)).toEqual([
      'Introduction',
      'Installation',
    ]);
  });
});
