// Verifies the *packaged* schematics actually load. The unit tests import the
// factory directly, so they cannot catch packaging faults: a wrong factory path
// in collection.json, CommonJS output under a "type": "module" package, or a
// schema the Angular CLI's validator rejects. All three shipped broken at some
// point, so this runs as part of build-schematics and fails the build instead.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

const dist = 'dist/packages/core/schematics';
const require = createRequire(import.meta.url);
const read = path => JSON.parse(readFileSync(path, 'utf-8'));

const collectionPath = resolve(dist, 'collection.json');
const collection = read(collectionPath);

for (const [name, entry] of Object.entries(collection.schematics)) {
  const [factoryPath, exportName] = entry.factory.split('#');

  // Resolves relative to collection.json, exactly as the schematics engine does.
  const resolved = require.resolve(
    resolve(dirname(collectionPath), factoryPath),
  );
  const loaded = require(resolved);

  if (typeof loaded[exportName] !== 'function') {
    throw new Error(
      `${name}: ${entry.factory} did not export a function named "${exportName}"`,
    );
  }

  // The CLI validator rejects draft-04 "id" in favour of "$id".
  const schema = read(resolve(dirname(collectionPath), entry.schema));
  if ('id' in schema) {
    throw new Error(
      `${name}: ${entry.schema} uses "id"; the Angular CLI requires "$id"`,
    );
  }
}

console.log(
  `verified ${Object.keys(collection.schematics).length} packaged schematic(s)`,
);
