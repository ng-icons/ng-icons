import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

/**
 * The inline script in index.html and the theme service have to agree.
 *
 * They are written in different files, in different languages, against the same
 * localStorage key, and nothing connected them: the service persists through a
 * JSON-backed store so it writes `"dark"`, while the script compared the raw
 * string to `dark`. Someone with a saved dark preference got a light first paint
 * that Angular corrected a moment later, which is the flash the script is there
 * to prevent.
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

/** The prepaint script, lifted out of index.html and run as written. */
const prepaintScript = (() => {
  const html = readFileSync(
    join(workspaceRoot, 'apps/documentation/index.html'),
    'utf8',
  );
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
    ([, body]) => body,
  );
  const script = scripts.find(body => body.includes('ng-icons-theme'));

  if (!script) {
    throw new Error('No prepaint theme script found in index.html');
  }

  return script;
})();

/** How `storedSignal` writes a theme: JSON, so the string arrives quoted. */
const asStored = (theme: string) => JSON.stringify(theme);

function runPrepaint(
  stored: string | null,
  prefersDark = false,
): string | undefined {
  const root: Record<string, string> = {};
  const context = {
    localStorage: {
      getItem: (key: string) => (key === 'ng-icons-theme' ? stored : null),
    },
    matchMedia: (query: string) => ({
      matches: query.includes('dark') ? prefersDark : false,
    }),
    document: { documentElement: { dataset: root } },
  };

  new Function('window', 'document', 'localStorage', prepaintScript)(
    context,
    context.document,
    context.localStorage,
  );

  return root['theme'];
}

describe('the prepaint theme script', () => {
  let stored: string | null;

  beforeEach(() => {
    stored = null;
  });

  it('honours a saved dark preference in the format the app writes it', () => {
    expect(runPrepaint(asStored('dark'))).toBe('dark');
  });

  it('honours a saved light preference over a dark system setting', () => {
    expect(runPrepaint(asStored('light'), true)).toBe('light');
  });

  it('still reads a bare value left by an earlier visit', () => {
    expect(runPrepaint('dark')).toBe('dark');
    expect(runPrepaint('light', true)).toBe('light');
  });

  it('falls back to the system setting when nothing is saved', () => {
    expect(runPrepaint(null, true)).toBe('dark');
    expect(runPrepaint(null, false)).toBe('light');
  });

  /** The whole point: no correction once Angular reads the same value back. */
  it('agrees with the stored value for both themes', () => {
    for (const theme of ['dark', 'light']) {
      expect(runPrepaint(asStored(theme)), theme).toBe(theme);
    }
  });

  it('does not throw when storage is unavailable', () => {
    expect(() => {
      new Function('window', 'document', 'localStorage', prepaintScript)(
        {
          matchMedia: () => ({ matches: false }),
        },
        { documentElement: { dataset: {} } },
        {
          getItem: () => {
            throw new Error('private mode');
          },
        },
      );
    }).not.toThrow();
  });

  it('is the value the theme service would read back', () => {
    // ThemeService seeds itself from data-theme, so whatever the script sets is
    // what the app adopts. Anything other than `dark` becomes light.
    const chosen = runPrepaint(asStored('dark'));

    expect(chosen === 'dark' ? 'dark' : 'light').toBe('dark');
  });
});
