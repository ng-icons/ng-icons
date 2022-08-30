import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Schema } from '../schema';

export function addDeployTarget(tree: Tree, schema: Schema) {
  const configuration = readProjectConfiguration(tree, schema.name);

  configuration.targets!.publish = {
    executor: '@nrwl/workspace:run-commands',
    options: {
      command: `node tools/scripts/publish.mjs ${schema.name} {args.ver} {args.tag}`,
    },
    dependsOn: ['build'],
  };

  updateProjectConfiguration(tree, schema.name, configuration);
}
