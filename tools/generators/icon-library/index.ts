import { libraryGenerator } from '@nrwl/angular/generators';
import { UnitTestRunner } from '@nrwl/angular/src/utils/test-runners';
import { formatFiles, Tree } from '@nrwl/devkit';

export default async function (tree: Tree, schema: { name: string }) {
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
  await formatFiles(tree);
}
