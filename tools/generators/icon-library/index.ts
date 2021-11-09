import { libraryGenerator } from '@nrwl/angular/generators';
import { UnitTestRunner } from '@nrwl/angular/src/utils/test-runners';
import {
  formatFiles,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { iconGenerator } from '../svg-to-ts/index';

interface Schema {
  name: string;
  svgPath: string;
  prefix: string;
}

export default async function (tree: Tree, schema: Schema) {
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

  const configuration = readProjectConfiguration(tree, schema.name);

  configuration.targets.deploy = {
    executor: 'ngx-deploy-npm:deploy',
    options: {
      access: 'public',
    },
  };

  updateProjectConfiguration(tree, schema.name, configuration);
  
  updateJson(tree, `packages/${schema.name}/package.json`, json => {
    json.license = 'MIT';
    json.repository = {
      url: 'https://github.com/ng-icons/ng-icons'
    };
    json.homepage = 'https://ng-icons.github.io/ng-icons/';
    json.peerDependencies = {
      '@angular/common': '>=11.0.0',
      '@angular/core': '>=11.0.0'
    };
    json.dependencies = {
      'tslib': '^2.2.0'
    };
    
    return json;
  });

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

  updateJson(tree, `packages/${schema.name}/tsconfig.lib.prod.json`, json => {
    json.angularCompilerOptions = {
      enableIvy: false,
    };
    return json;
  });

  updateJson(tree, 'tools/generators/svg-to-ts/iconsets.json', json => {
    json.push({
      from: schema.svgPath,
      to: `packages/${schema.name}/src/index.ts`,
      prefix: schema.prefix,
    });

    return json;
  });

  await iconGenerator(tree);

  await formatFiles(tree);
}
