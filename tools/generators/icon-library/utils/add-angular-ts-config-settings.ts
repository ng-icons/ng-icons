import { Tree, updateJson } from '@nrwl/devkit';
import { Schema } from '../schema';

export function addAngularTsConfigSettings(tree: Tree, schema: Schema) {
  updateJson(tree, `packages/${schema.name}/tsconfig.json`, json => {
    json.compilerOptions = {
      forceConsistentCasingInFileNames: true,
      strict: true,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
    };
    json.angularCompilerOptions = {
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true,
    };
    return json;
  });

  updateJson(tree, `packages/${schema.name}/tsconfig.lib.json`, json => {
    json.angularCompilerOptions = {
      skipTemplateCodegen: true,
      strictMetadataEmit: true,
      enableResourceInlining: true,
    };
    return json;
  });
}
