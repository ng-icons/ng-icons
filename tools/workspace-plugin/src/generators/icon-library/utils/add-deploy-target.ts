import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { Schema } from '../schema';

export function addDeployTarget(tree: Tree, schema: Schema) {
  const configuration = readProjectConfiguration(tree, schema.name);

  configuration.targets!['nx-release-publish'] = {
    dependsOn: ['build'],
    options: {
      packageRoot: '{workspaceRoot}/dist/{projectRoot}',
    },
  };

  updateProjectConfiguration(tree, schema.name, configuration);
}
