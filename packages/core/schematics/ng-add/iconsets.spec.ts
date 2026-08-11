import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The set list `ng add` prompts with has to match what is actually published.
 *
 * It had drifted: the prompt offered `css-gg` where the package is
 * `@ng-icons/css.gg`, so choosing CSS.gg wrote a dependency on a package that
 * does not exist and the install failed. Four sets (Coolicons, Fluent UI, Lobe
 * Icons, PrimeIcons) could not be chosen at all.
 *
 * The previous test hardcoded the same list as the schema, so it agreed with the
 * bug rather than catching it. These assertions derive the expected list from
 * the packages themselves, so adding a set fails here until the prompt knows
 * about it.
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

const packagesDir = join(workspaceRoot, 'packages');

const readJson = (path: string) => JSON.parse(readFileSync(path, 'utf-8'));

const schema = readJson(
  join(packagesDir, 'core/schematics/ng-add/schema.json'),
) as {
  properties: {
    iconsets: {
      items: { enum: string[] };
      'x-prompt': { items: { value: string; label: string }[] };
    };
  };
};

const offered = schema.properties.iconsets.items.enum;
const prompt = schema.properties.iconsets['x-prompt'].items;

/**
 * The published icon sets, as their package names minus the scope.
 *
 * An icon set is a directory under `packages` with an `ng-package.json`, which
 * is what makes it a published Angular library. That excludes `schematics`,
 * which has none, and `core`, which is the one library that is not a set. The
 * slug comes from the package name rather than the directory, because they
 * differ: `packages/css-gg` publishes `@ng-icons/css.gg`.
 */
function publishedIconSets(): string[] {
  return readdirSync(packagesDir)
    .filter(dir => existsSync(join(packagesDir, dir, 'ng-package.json')))
    .map(dir => readJson(join(packagesDir, dir, 'package.json')).name as string)
    .filter(name => name !== '@ng-icons/core')
    .map(name => name.replace('@ng-icons/', ''))
    .sort();
}

describe('ng-add iconset list', () => {
  it('offers exactly the published icon set packages', () => {
    expect([...offered].sort()).toEqual(publishedIconSets());
  });

  it('offers each set once', () => {
    expect(new Set(offered).size).toBe(offered.length);
  });

  it('names a package that exists for every set it offers', () => {
    const published = new Set(publishedIconSets());

    for (const iconset of offered) {
      expect(published.has(iconset), `@ng-icons/${iconset}`).toBe(true);
    }
  });

  it('gives every set a prompt entry with a label', () => {
    expect(prompt.map(item => item.value)).toEqual(offered);

    for (const item of prompt) {
      expect(item.label.trim(), item.value).not.toBe('');
    }
  });
});
