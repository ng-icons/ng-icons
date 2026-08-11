import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

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

describe('global styles', () => {
  const styles = read('apps/documentation/src/styles.css');

  /**
   * The site colours icons with `text-*` classes, which only reach an
   * <ng-icon> if ng-icons' cascade layer is registered below Tailwind's. See
   * the comment at the top of styles.css.
   */
  it('registers the ng-icon layer before importing Tailwind', () => {
    const layerAt = styles.indexOf('@layer ng-icon;');
    const importAt = styles.indexOf(`@import 'tailwindcss'`);

    expect(layerAt).toBeGreaterThanOrEqual(0);
    expect(importAt).toBeGreaterThan(layerAt);
  });

  it('matches the layer name @ng-icons/core actually ships', () => {
    const component = read(
      'packages/core/src/lib/components/icon/icon.component.scss',
    );

    expect(component).toContain('@layer ng-icon {');
    expect(component).toContain('--ng-icon__color');
  });
});
