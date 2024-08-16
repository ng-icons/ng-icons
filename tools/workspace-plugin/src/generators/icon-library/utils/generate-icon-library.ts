import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import { readJson, Tree, updateJson } from '@nx/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { Schema } from '../schema';

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
}
