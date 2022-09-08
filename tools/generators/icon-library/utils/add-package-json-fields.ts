import { Tree, updateJson } from '@nrwl/devkit';
import { Schema } from '../schema';

export function addPackageJsonFields(tree: Tree, schema: Schema) {
  updateJson(tree, `packages/${schema.name}/package.json`, json => {
    json.license = schema.license;
    json.repository = {
      url: 'https://github.com/ng-icons/ng-icons',
    };
    json.homepage = 'https://ng-icons.github.io/ng-icons/';
    json.dependencies = {
      tslib: '^2.2.0',
    };

    return json;
  });
}
