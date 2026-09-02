/**
 * Assert that the built packages still carry the icon names into their types.
 *
 * `NgIconNameMap` only reaches a consumer if ng-packagr keeps each entry
 * point's `declare module '@ng-icons/core'` block when it bundles the `.d.ts`.
 * Nothing else would notice if it stopped: every package would still compile,
 * still publish, and every consumer's `<ng-icon name="">` autocomplete would
 * quietly go empty. Run after a build, over whatever is in dist.
 */
import { globSync, readFileSync } from 'node:fs';

const AUGMENTATION = /declare module ['"]@ng-icons\/core['"]/;

const failures = [];
let checked = 0;

// Only packages whose sources contribute names; the rest have nothing to keep.
const contributing = new Set(
  [
    ...globSync('packages/*/src/index.ts'),
    ...globSync('packages/*/*/src/index.ts'),
  ]
    .filter(file => AUGMENTATION.test(readFileSync(file, 'utf8')))
    .map(file => file.split('/')[1]),
);

for (const name of [...contributing].sort()) {
  const types = globSync(`dist/packages/${name}/**/*.d.ts`);

  // Not every package is built on every run: `nx affected` only builds what
  // changed, so an absent package is not a failure.
  if (types.length === 0) {
    continue;
  }

  checked++;

  if (!types.some(file => AUGMENTATION.test(readFileSync(file, 'utf8')))) {
    failures.push(
      `${name}: built types have no 'declare module' block, so the icon names never reach consumers`,
    );
  }
}

const coreTypes = globSync('dist/packages/core/**/*.d.ts');
if (coreTypes.length > 0) {
  checked++;
  if (
    !coreTypes.some(file =>
      readFileSync(file, 'utf8').includes('interface NgIconNameMap'),
    )
  ) {
    failures.push(
      'core: built types no longer declare NgIconNameMap, so every augmentation is inert',
    );
  }
}

for (const failure of failures) {
  console.error(`::error::${failure}`);
}

if (checked === 0) {
  console.log('No built icon packages to check.');
} else {
  console.log(
    `Checked ${checked} built package${checked === 1 ? '' : 's'}: ${failures.length} problem${failures.length === 1 ? '' : 's'}.`,
  );
}

process.exit(failures.length > 0 ? 1 : 0);
