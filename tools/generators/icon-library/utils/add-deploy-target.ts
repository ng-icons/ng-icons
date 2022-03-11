import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Schema } from '../schema';

export function addDeployTarget(tree: Tree, schema: Schema) {
  const configuration = readProjectConfiguration(tree, schema.name);

  configuration.targets.deploy = {
    executor: 'ngx-deploy-npm:deploy',
    options: {
      access: 'public',
    },
  };

  updateProjectConfiguration(tree, schema.name, configuration);
}
