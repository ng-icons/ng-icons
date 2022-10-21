import { libraryGenerator, UnitTestRunner } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';
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
  });

  tree.delete(`packages/${schema.name}/src/lib/${schema.name}.module.ts`);
}
