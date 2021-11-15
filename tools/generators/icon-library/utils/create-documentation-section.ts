import { joinPathFragments, Tree } from '@nrwl/devkit';
import { addImportToModule } from '@nrwl/angular/src/utils/nx-devkit/ast-utils';
import { Schema } from '../schema';
import { wrapAngularDevkitSchematic } from '@nrwl/tao/src/commands/ngcli-adapter';
import ts = require('typescript');

export async function createDocumentationSection(tree: Tree, schema: Schema) {
  await generateModule(tree, schema);
  removeUnusedFiles(tree, schema);
  insertComponentTemplate(tree, schema);
  insertModuleImports(tree, schema);
}

function insertModuleImports(tree: Tree, schema: Schema) {
  // find the ng module file
  const ngModuleFile = joinPathFragments(
    'apps',
    'documentation',
    'src',
    'app',
    schema.name,
    `${schema.name}.module.ts`,
  );

  // create typescript source file from ngModuleFile
  const sourceFile = ts.createSourceFile(
    ngModuleFile,
    tree.read(ngModuleFile).toString(),
    ts.ScriptTarget.Latest,
    true,
  );

  // insert the ng module imports
  addImportToModule(tree, sourceFile, '', '');
}

function insertComponentTemplate(tree: Tree, schema: Schema) {
  // insert the default html
  tree.write(
    `apps/documentation/src/app/${schema.name}/${schema.name}.component.html`,
    '<app-icon-page\n' +
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
