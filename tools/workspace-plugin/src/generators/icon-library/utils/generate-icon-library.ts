import {
  libraryGenerator,
  librarySecondaryEntryPointGenerator,
  UnitTestRunner,
} from '@nx/angular/generators';
import { names, readJson, Tree, updateJson } from '@nx/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { Schema } from '../schema';
import { addIconset } from './add-iconset';

export async function generateIconLibrary(tree: Tree, schema: Schema) {
  await libraryGenerator(tree, {
    name: schema.name,
    publishable: true,
    commonModule: false,
    importPath: `@ng-icons/${schema.name}`,
    prefix: 'ng',
    standaloneConfig: true,
    strict: true,
    unitTestRunner: UnitTestRunner.Jest,
    addModuleSpec: false,
    projectNameAndRootFormat: 'as-provided',
    directory: `packages/${schema.name}`,
  });

  tree.delete(`packages/${schema.name}/src/lib/${schema.name}.module.ts`);
  tree.delete(`packages/${schema.name}/src/lib/${schema.name}`);
  tree.write(`packages/${schema.name}/src/index.ts`, '');

  const { version } = readJson<PackageJson>(tree, `packages/core/package.json`);

  // update the package.json file to remove peerDependencies
  updateJson(tree, `packages/${schema.name}/package.json`, json => {
    delete json.peerDependencies;
    json.version = version;
    return json;
  });

  // if there are multiple entrypoints, we need to generate them
  const entrypoints = schema.entrypoints?.split(',').map(e => e.trim()) ?? [];

  for (const entrypoint of entrypoints) {
    await librarySecondaryEntryPointGenerator(tree, {
      name: names(entrypoint).fileName,
      library: schema.name,
      skipFormat: true,
      skipModule: true,
    });
  }

  // if there are entrypoints defined, null out the default index.ts file
  if (entrypoints.length) {
    tree.write(
      `packages/${schema.name}/src/index.ts`,
      '// this file is needed for the build to work\nexport default null;',
    );
  }

  addIconset(tree, schema);
}
