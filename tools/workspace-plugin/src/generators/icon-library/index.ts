import { formatFiles, Tree } from '@nx/devkit';
import { Schema } from './schema';
import { addAngularTsConfigSettings } from './utils/add-angular-ts-config-settings';
import { addDeployTarget } from './utils/add-deploy-target';
import { addPackageJsonFields } from './utils/add-package-json-fields';
import { generateIconLibrary } from './utils/generate-icon-library';
import { generateIconTest } from './utils/icon-test';

export default async function (tree: Tree, schema: Schema) {
  await generateIconLibrary(tree, schema);
  addDeployTarget(tree, schema);
  addPackageJsonFields(tree, schema);
  addAngularTsConfigSettings(tree, schema);
  generateIconTest(tree, schema);
  await formatFiles(tree);
}
