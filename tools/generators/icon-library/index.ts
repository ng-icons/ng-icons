import { formatFiles, Tree } from '@nrwl/devkit';
import { iconGenerator } from '../svg-to-ts';
import { Schema } from './schema';
import { generateIconLibrary } from './utils/generate-icon-library';
import { updateTargets } from './utils/update-targets';
import { updateDependencies } from './utils/update-dependencies';
import { updateTsConfig } from './utils/update-ts-config';
import { createDocumentationSection } from './utils/create-documentation-section';
import { createIconsetDeclaration } from './utils/create-iconset-declaration';

export default async function (tree: Tree, schema: Schema) {
  await generateIconLibrary(tree, schema);
  updateTargets(tree, schema);
  updateDependencies(tree, schema);
  updateTsConfig(tree, schema);
  createIconsetDeclaration(tree, schema);
  await iconGenerator(tree);
  await createDocumentationSection(tree, schema);
  await formatFiles(tree);
}
