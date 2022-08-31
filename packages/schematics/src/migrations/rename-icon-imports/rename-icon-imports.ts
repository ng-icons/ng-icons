import { Tree, visitNotIgnoredFiles } from '@nrwl/devkit';
import { basename } from 'path';
import * as ts from 'typescript';

export default function update(tree: Tree) {
  visitNotIgnoredFiles(tree, '/', path => {
    // if the path file extension is a .ts file, update the file
    if (basename(path).endsWith('.ts')) {
      // create a source file from the file contents
      const sourceFile = ts.createSourceFile(
        path,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tree.read(path)!.toString(),
        ts.ScriptTarget.Latest,
        true,
      );

      // run transformer on the source file
      const transformedSourceFile = ts.transform(sourceFile, [
        importTransformer,
        withIconsTransformer,
      ]).transformed[0];

      const printer = ts.createPrinter();
      const output = printer.printFile(transformedSourceFile);

      // update the file contents with the transformed source file
      tree.write(path, output);
    }
  });
}

//  create a typescript transformer that renames imports to lowerCamelCase
const importTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: ts.Node): ts.Node => {
      // check if the node is an import declaration and the import is from an @ng-icons/ library, but not @ng-icons core
      if (
        ts.isImportDeclaration(node) &&
        node.moduleSpecifier &&
        node.importClause?.namedBindings &&
        ts.isNamedImports(node.importClause.namedBindings)
      ) {
        const moduleSpecifier = node.moduleSpecifier.getText();
        if (
          moduleSpecifier.includes('@ng-icons/') &&
          !moduleSpecifier.includes('@ng-icons/core')
        ) {
          // update the import declaration renaming each named import to lowerCamelCase
          const newNamedImports = node.importClause.namedBindings.elements.map(
            element => {
              const newName = ts.factory.createIdentifier(
                toPropertyName(element.name.getText()),
              );
              return ts.factory.createImportSpecifier(
                false,
                undefined,
                newName,
              );
            },
          );

          return ts.factory.createImportDeclaration(
            node.decorators,
            node.modifiers,
            ts.factory.createImportClause(
              false,
              undefined,
              ts.factory.createNamedImports(newNamedImports),
            ),
            node.moduleSpecifier,
          );
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

// create a typescript transformer to find the NgIconsModule.withIcons call expression and rename all the imports to lowerCamelCase
const withIconsTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: ts.Node): ts.Node => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.getText() === 'withIcons' &&
        node.expression.expression.getText() === 'NgIconsModule' &&
        node.arguments.length === 1 &&
        ts.isObjectLiteralExpression(node.arguments[0])
      ) {
        // update the NgIconsModule.withIcons call expression renaming each property access expression to lowerCamelCase
        const newProperties = node.arguments[0].properties.map(property => {
          if (!ts.isShorthandPropertyAssignment(property)) {
            return property;
          }

          const newName = ts.factory.createIdentifier(
            toPropertyName(property.name.getText()),
          );
          return ts.factory.createShorthandPropertyAssignment(
            newName,
            property.objectAssignmentInitializer,
          );
        });

        return ts.factory.createCallExpression(
          node.expression,
          node.typeArguments,
          [ts.factory.createObjectLiteralExpression(newProperties)],
        );
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

// convert upperCamelCase to lowerCamelCase
function toPropertyName(str: string): string {
  return str
    .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
      chr ? chr.toUpperCase() : '',
    )
    .replace(/[^a-zA-Z\d]/g, '')
    .replace(/^([A-Z])/, m => m.toLowerCase());
}
