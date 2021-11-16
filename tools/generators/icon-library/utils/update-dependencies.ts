import { Tree, updateJson } from '@nrwl/devkit';
import { Schema } from '../schema';

export function updateDependencies(tree: Tree, schema: Schema) {
  updateJson(tree, `packages/${schema.name}/package.json`, json => {
    json.license = schema.license;
    json.repository = {
      url: 'https://github.com/ng-icons/ng-icons',
    };
    json.homepage = 'https://ng-icons.github.io/ng-icons/';
    json.peerDependencies = {
      '@angular/common': '>=12.0.0',
      '@angular/core': '>=12.0.0',
    };
    json.dependencies = {
      tslib: '^2.2.0',
    };

    return json;
  });
}
