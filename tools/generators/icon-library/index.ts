import { libraryGenerator } from '@nrwl/angular/generators';
import { getTsSourceFile } from '@nrwl/angular/src/utils/nx-devkit/ast-utils';
import { UnitTestRunner } from '@nrwl/angular/src/utils/test-runners';
import {
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import ts, { factory } from 'typescript';
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

  // adding documentation
  const sourceFile = getTsSourceFile(
    tree,
    'apps/documentation/src/app/app.component.ts',
  );

  const output = ts.transform(sourceFile, [arrayTransformer(schema.name)]);

  await formatFiles(tree);
}

function arrayTransformer(name: string): ts.TransformerFactory<ts.SourceFile> {
  return context => {
    return sourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        if (
          ts.isPropertyDeclaration(node) &&
          ts.isIdentifier(node.name) &&
          node.name.text === 'iconsets' &&
          ts.isArrayLiteralExpression(node.initializer)
        ) {
          return factory.createPropertyDeclaration(
            undefined,
            [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            factory.createIdentifier('iconsets'),
            undefined,
            undefined,
            factory.createArrayLiteralExpression(
              [
                ...node.initializer.elements,
                factory.createObjectLiteralExpression(
                  [
                    factory.createPropertyAssignment(
                      factory.createIdentifier('title'),
                      factory.createStringLiteral(
                        name
                          .split('-')
                          .map(
                            word =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(' '),
                      ),
                    ),
                    factory.createPropertyAssignment(
                      factory.createIdentifier('icons'),
                      factory.createIdentifier(names(name).propertyName),
                    ),
                  ],
                  true,
                ),
              ],
              true,
            ),
          );
        }

        return node;
      };

      return ts.visitNode(sourceFile, visitor);
    };
  };
}
