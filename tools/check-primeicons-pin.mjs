/**
 * Assert that `primeicons` is still pinned to 7.0.0, the last MIT release.
 *
 * PrimeTek released 8.0.0 and later under the PrimeUI Community/Commercial
 * License, which forbids redistributing the icons. `@ng-icons/primeicons` is
 * exactly that kind of redistribution, so it must stay frozen at 7.0.0 (see
 * https://github.com/ng-icons/ng-icons/issues/268). A dependency-update bot or a
 * careless `pnpm up` would bump it without anyone noticing, so fail CI instead.
 */
import { existsSync, readFileSync } from 'node:fs';

const PINNED = '7.0.0';
const failures = [];

const rootPackage = JSON.parse(readFileSync('package.json', 'utf8'));
const declared = {
  ...rootPackage.devDependencies,
  ...rootPackage.dependencies,
}['primeicons'];

if (declared !== PINNED) {
  failures.push(
    `package.json declares primeicons@${declared}; it must be exactly ${PINNED} (no range)`,
  );
}

const installedManifest = 'node_modules/primeicons/package.json';
if (existsSync(installedManifest)) {
  const installed = JSON.parse(readFileSync(installedManifest, 'utf8')).version;
  if (installed !== PINNED) {
    failures.push(`installed primeicons is ${installed}; it must be ${PINNED}`);
  }
}

for (const failure of failures) {
  console.error(`::error::${failure}`);
}

if (failures.length > 0) {
  console.error(
    'primeicons 8.0.0+ is not MIT licensed and cannot be redistributed. See https://github.com/ng-icons/ng-icons/issues/268',
  );
  process.exit(1);
}

console.log(`primeicons is pinned to ${PINNED}.`);
