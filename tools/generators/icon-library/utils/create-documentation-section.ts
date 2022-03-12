import { joinPathFragments, names, Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
import { wrapAngularDevkitSchematic } from '@nrwl/tao/src/commands/ngcli-adapter';
import { getSourceFile, writeSourceFile } from './source-file';
import {
  addCallToNgModuleImport,
  addImportToNgModule,
  addNamespaceImport,
  insertClassProperty,
  removeAllMethods,
  removeNgOnInitImplements,
} from './ast-utils';
import ts = require('typescript');

export async function createDocumentationSection(tree: Tree, schema: Schema) {
  await generateModule(tree, schema);
  removeUnusedFiles(tree, schema);
  insertComponentTemplate(tree, schema);
  insertModuleImports(tree, schema);
  updateComponentClass(tree, schema);
}

function updateComponentClass(tree: Tree, schema: Schema) {
  // find the component file
  const componentPath = joinPathFragments(
    'apps',
    'documentation',
    'src',
    'app',
    schema.name,
    `${schema.name}.component.ts`,
  );

  let sourceFile = getSourceFile(tree, componentPath);
  sourceFile = removeAllMethods(sourceFile);
  sourceFile = removeNgOnInitImplements(sourceFile);
  sourceFile = addNamespaceImport(
    sourceFile,
    `@ng-icons/${schema.name}`,
    'iconset',
  );
  sourceFile = insertClassProperty(sourceFile, 'iconset', 'iconset');

  writeSourceFile(tree, componentPath, sourceFile);
}

function insertModuleImports(tree: Tree, schema: Schema) {
  // find the ng module file
  const modulePath = joinPathFragments(
    'apps',
    'documentation',
    'src',
    'app',
    schema.name,
    `${schema.name}.module.ts`,
  );

  // create typescript source file from ngModuleFile
  let sourceFile = getSourceFile(tree, modulePath);

  // insert the ng module imports
  sourceFile = addImportToNgModule(
    sourceFile,
    '../shared/shared.module',
    'SharedModule',
  );

  sourceFile = addNamespaceImport(
    sourceFile,
    `@ng-icons/${schema.name}`,
    'iconset',
  );

  sourceFile = addImportToNgModule(
    sourceFile,
    '@ng-icons/core',
    'NgIconsModule',
  );

  sourceFile = addCallToNgModuleImport(
    sourceFile,
    'NgIconsModule',
    'withIcons',
    [ts.factory.createIdentifier('iconset')],
  );

  writeSourceFile(tree, modulePath, sourceFile);
}

function insertComponentTemplate(tree: Tree, schema: Schema) {
  // insert the default html
  tree.write(
    `apps/documentation/src/app/${schema.name}/${schema.name}.component.html`,
    '<app-icon-page\n' +
      '  name="' + names(schema.name).className + '"\n' +
      '  [iconset]="iconset"\n' +
      '  library="' +
      schema.name +
      '"\n' +
      '  website=""\n' +
      '  license="' +
      schema.license +
      '"\n' +
      '></app-icon-page>\n',
  );
}

async function generateModule(tree: Tree, schema: Schema) {
  await wrapAngularDevkitSchematic('@schematics/angular', 'module')(tree, {
    name: schema.name,
    module: 'app',
    routing: true,
    route: schema.name,
    project: 'documentation',
  });
}

function removeUnusedFiles(tree: Tree, schema: Schema) {
  // delete the spec file
  tree.delete(
    `apps/documentation/src/app/${schema.name}/${schema.name}.component.spec.ts`,
  );
}
