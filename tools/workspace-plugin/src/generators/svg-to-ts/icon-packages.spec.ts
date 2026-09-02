import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * The packaging half of the `NgIconNameMap` contract. The types are covered by
 * `packages/core/src/lib/components/icon/icon-name.type-spec.ts`; these assert
 * the manifests that have to hold for those types to reach a consumer at all.
 */

const workspaceRoot = fileURLToPath(new URL('../../../../..', import.meta.url));

interface IconPackage {
  name: string;
  manifest: { version: string; peerDependencies?: Record<string, string> };
}

/** Every package with at least one entry point that contributes icon names. */
function iconPackages(): IconPackage[] {
  const contributing = new Set(
    [
      ...globSync('packages/*/src/index.ts', { cwd: workspaceRoot }),
      ...globSync('packages/*/*/src/index.ts', { cwd: workspaceRoot }),
    ]
      .filter(file =>
        readFileSync(`${workspaceRoot}/${file}`, 'utf8').includes(
          "declare module '@ng-icons/core'",
        ),
      )
      .map(file => file.split('/')[1]),
  );

  return [...contributing].sort().map(name => ({
    name,
    manifest: JSON.parse(
      readFileSync(`${workspaceRoot}/packages/${name}/package.json`, 'utf8'),
    ),
  }));
}

describe('icon packages', () => {
  const packages = iconPackages();

  it('should find the icon packages', () => {
    // Guards the guard: a glob that matched nothing would make every
    // assertion below pass silently.
    expect(packages.length).toBeGreaterThan(30);
  });

  it.each(packages.map(p => [p.name, p] as const))(
    '%s should declare @ng-icons/core as a peer dependency',
    (_name, iconPackage) => {
      // A package's generated names are contributed to core's `NgIconNameMap`,
      // so it genuinely depends on core's types. Declaring it also keeps a
      // package manager from resolving a second copy of core: the augmentation
      // attaches to whichever core the package resolves to, and if that is not
      // the one the application imports, the names silently disappear.
      expect(iconPackage.manifest.peerDependencies?.['@ng-icons/core']).toBe(
        `^${iconPackage.manifest.version}`,
      );
    },
  );
});
