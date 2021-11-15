import { libraryGenerator } from '@nrwl/angular/generators';
import { UnitTestRunner } from '@nrwl/angular/src/utils/test-runners';
import {
  formatFiles,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/tao/src/commands/ngcli-adapter';
import { iconGenerator } from '../svg-to-ts';

interface Schema {
  name: string;
  svgPath?: string;
  prefix: string;
  license: string;
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

  // remove test target
  delete configuration.targets.test;

  updateProjectConfiguration(tree, schema.name, configuration);

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

  // TODO - Make this work
  // updateJson(tree, 'tools/generators/svg-to-ts/iconsets.json', json => {
  //   json.push({
  //     from: schema.svgPath ? [schema.svgPath] : [],
  //     to: `packages/${schema.name}/src/index.ts`,
  //     prefix: schema.prefix,
  //   });
  //
  //   return json;
  // });

  // remove the test files
  tree.delete(`packages/${schema.name}/jest.config.js`);
  tree.delete(`packages/${schema.name}/tsconfig.spec.json`);
  tree.delete(`packages/${schema.name}/src/test-setup.ts`);

  if (schema.svgPath) {
    await iconGenerator(tree);
  }

  await wrapAngularDevkitSchematic('@schematics/angular', 'module')(tree, {
    name: schema.name,
    module: 'app',
    routing: true,
    route: schema.name,
    project: 'documentation',
  });

  // delete the spec file
  tree.delete(
    `apps/documentation/src/app/${schema.name}/${schema.name}.component.spec.ts`,
  );

  // insert the default html
  tree.write(
    `apps/documentation/src/app/${schema.name}/${schema.name}.component.html`,
    '<app-icon-page\n' +
      '  [iconset]="iconset"\n' +
      '  library="' +
      schema.name +
      '"\n' +
      '  website=""\n' +
      '  license="MIT"\n' +
      '></app-icon-page>\n',
  );

  await formatFiles(tree);
}
