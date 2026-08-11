import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildIconData,
  discoverIconSets,
  parseIconExports,
  ROOT_VARIANT,
  unescapeTemplateLiteral,
} from './icon-data';

/** Vitest's cwd depends on how it was launched, so walk up to find the root. */
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

describe('parseIconExports', () => {
  it('reads one icon per line', () => {
    const icons = parseIconExports(
      [
        'export const featherActivity = `<svg viewBox="0 0 24 24"><polyline /></svg>`;',
        'export const featherAirplay = `<svg viewBox="0 0 24 24"><path /></svg>`;',
      ].join('\n'),
    );

    expect(Object.keys(icons)).toEqual(['featherActivity', 'featherAirplay']);
    expect(icons['featherAirplay']).toBe(
      '<svg viewBox="0 0 24 24"><path /></svg>',
    );
  });

  it('ignores exports that are not SVGs', () => {
    const icons = parseIconExports(
      [
        'export default null;',
        'export function withMaterialSymbolsOutlined() { return {}; }',
        'export const notAnIcon = `hello`;',
        'export const matSymbolHome = `<svg><path /></svg>`;',
      ].join('\n'),
    );

    expect(Object.keys(icons)).toEqual(['matSymbolHome']);
  });

  it('reads icons that carry an XML declaration, as Dripicons does', () => {
    const icons = parseIconExports(
      'export const dripAlarm = `<?xml version="1.0"?><svg><path /></svg>`;',
    );

    expect(icons['dripAlarm']).toBe('<?xml version="1.0"?><svg><path /></svg>');
  });

  it('keeps backticks-free multi-element bodies intact', () => {
    const body = '<svg><path d="M0 0h24v24H0z" /><circle r="2" /></svg>';
    expect(parseIconExports(`export const a = \`${body}\`;`)['a']).toBe(body);
  });
});

describe('unescapeTemplateLiteral', () => {
  it('turns the escapes TypeScript emits back into their characters', () => {
    expect(unescapeTemplateLiteral(String.raw`a\tb\r\nc`)).toBe('a\tb\r\nc');
    expect(unescapeTemplateLiteral(String.raw`\\`)).toBe('\\');
    expect(unescapeTemplateLiteral(String.raw`\``)).toBe('`');
    expect(unescapeTemplateLiteral(String.raw`\x41\u0042`)).toBe('AB');
    expect(unescapeTemplateLiteral(String.raw`\u{1F600}`)).toBe('\u{1F600}');
  });

  it('leaves ordinary text alone', () => {
    const path = '<svg><path d="M12,24L1,19.7V12h2z" /></svg>';
    expect(unescapeTemplateLiteral(path)).toBe(path);
  });
});

describe('parseIconExports against the compiled module', () => {
  /**
   * The entry points are read as text, so this compares against the values
   * TypeScript actually compiles rather than against another text read of the
   * same file, which would agree with any parsing mistake.
   */
  it('reproduces the values @ng-icons/ux-aspects exports', async () => {
    const compiled = (await import('@ng-icons/ux-aspects')) as Record<
      string,
      string
    >;
    const parsed = parseIconExports(
      readFileSync(
        join(workspaceRoot, 'packages/ux-aspects/src/index.ts'),
        'utf8',
      ),
    );

    const names = Object.keys(parsed);
    expect(names.length).toBeGreaterThan(400);
    for (const name of names) {
      expect(parsed[name], name).toBe(compiled[name]);
    }
  });

  it('reproduces the values @ng-icons/dripicons exports', async () => {
    const compiled = (await import('@ng-icons/dripicons')) as Record<
      string,
      string
    >;
    const parsed = parseIconExports(
      readFileSync(
        join(workspaceRoot, 'packages/dripicons/src/index.ts'),
        'utf8',
      ),
    );

    for (const [name, body] of Object.entries(parsed)) {
      expect(body, name).toBe(compiled[name]);
    }
  });

  it('leaves no stray backslash in any icon it parses', () => {
    const parsed = parseIconExports(
      readFileSync(
        join(workspaceRoot, 'packages/ux-aspects/src/index.ts'),
        'utf8',
      ),
    );

    // A backslash inside path data makes the browser abandon the rest of it.
    const withBackslash = Object.keys(parsed).filter(name =>
      parsed[name].includes('\\'),
    );
    expect(withBackslash).toEqual([]);
  });
});

describe('discoverIconSets', () => {
  const sets = discoverIconSets(workspaceRoot);

  it('finds the icon packages and skips core', () => {
    expect(sets.length).toBeGreaterThan(30);
    expect(sets.map(set => set.pkg)).not.toContain('@ng-icons/core');
  });

  it('groups a package with subpaths into one set', () => {
    const heroicons = sets.find(set => set.pkg === '@ng-icons/heroicons');

    expect(heroicons?.slug).toBe('heroicons');
    // The root entry is discovered too; it holds no icons so buildIconData
    // drops it from the published set.
    expect(heroicons?.variants.map(variant => variant.id).sort()).toEqual([
      ROOT_VARIANT,
      'micro',
      'mini',
      'outline',
      'solid',
    ]);
  });

  it('drops entry points that contain no icons', () => {
    const heroicons = buildIconData(
      sets.filter(set => set.pkg === '@ng-icons/heroicons'),
    ).sets[0];

    expect(heroicons.variants.map(variant => variant.id)).toEqual([
      'micro',
      'mini',
      'outline',
      'solid',
    ]);
    expect(heroicons.count).toBe(1288);
  });

  it('labels a package root entry as the default variant', () => {
    const lucide = sets.find(set => set.pkg === '@ng-icons/lucide');

    expect(lucide?.variants).toHaveLength(1);
    expect(lucide?.variants[0]).toMatchObject({
      id: ROOT_VARIANT,
      subpath: '@ng-icons/lucide',
    });
  });
});
