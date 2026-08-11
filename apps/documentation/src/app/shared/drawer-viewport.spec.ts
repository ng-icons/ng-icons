import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DRAWER_BELOW, SHEET_FROM_BOTTOM_BELOW } from './drawer-viewport';

/**
 * The breakpoint is stated twice: once in CSS, once in script.
 *
 * The panels are laid out by `xl:` classes, but `inert` is an attribute rather
 * than a style, so script has to measure the same width the CSS switches at.
 * They were already out of step once, at 1180 and 1280, which left the docs
 * sidebar displayed as a column while marked inert: every link visible and
 * unusable between those two widths.
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

const styles = readFileSync(
  join(workspaceRoot, 'apps/documentation/src/styles.css'),
  'utf8',
);

const pages = ['browse.page.ts', 'docs.page.ts'].map(file => ({
  file,
  source: readFileSync(
    join(workspaceRoot, 'apps/documentation/src/app/pages', file),
    'utf8',
  ),
}));

/** Every app source except this module, which is where the numbers belong. */
const appSources = (() => {
  const root = join(workspaceRoot, 'apps/documentation/src/app');
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return walk(path);
      return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts')
        ? [path]
        : [];
    });

  return walk(root)
    .filter(path => !path.endsWith('drawer-viewport.ts'))
    .map(path => ({
      file: path.slice(root.length + 1),
      source: readFileSync(path, 'utf8'),
    }));
})();

describe('the drawer breakpoint', () => {
  it('matches the xl breakpoint the panels are laid out with', () => {
    const declared = /--breakpoint-xl:\s*(\d+)px/.exec(styles)?.[1];

    expect(declared, 'no --breakpoint-xl in styles.css').toBeDefined();
    expect(DRAWER_BELOW).toBe(Number(declared));
  });

  it('matches the mob breakpoint the sheet changes direction at', () => {
    const declared = /--breakpoint-mob:\s*(\d+)px/.exec(styles)?.[1];

    expect(declared, 'no --breakpoint-mob in styles.css').toBeDefined();
    expect(SHEET_FROM_BOTTOM_BELOW).toBe(Number(declared));
  });

  /**
   * Every width the script measures should come from here. The detail sheet had
   * four literal copies of these two numbers.
   */
  it('is the only place the app compares a viewport width', () => {
    const offenders = appSources.filter(({ source }) =>
      /innerWidth\s*[<>]=?\s*\d/.test(source),
    );

    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  /**
   * Both off-canvas panels have to be taken out of the tab order when closed.
   * Only the documentation one was, and the filters drawer held 46 focusable
   * controls that a keyboard could still reach while it sat off screen.
   */
  it.each(pages)('$file marks its off-canvas panel inert', ({ source }) => {
    expect(source).toContain('attr.inert');
  });

  it.each(pages)('$file measures the width in one place only', ({ source }) => {
    // A literal width here would be a second copy of the breakpoint.
    expect(source).not.toMatch(/innerWidth\s*[<>]=?\s*\d/);
    expect(source).toContain('injectDrawerViewport');
  });
});
