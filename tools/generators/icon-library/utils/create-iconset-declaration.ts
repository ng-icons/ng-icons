import { joinPathFragments, Tree } from '@nrwl/devkit';
import { Schema } from '../schema';
import * as ts from 'typescript';

export function createIconsetDeclaration(tree: Tree, schema: Schema) {
  const iconsetPath = joinPathFragments(
    'tools',
    'generators',
    'svg-to-ts',
    'iconsets.ts',
  );
  const iconsetContent = tree.read(iconsetPath).toString();

  const sourceFile = ts.createSourceFile(
    iconsetPath,
    iconsetContent,
    ts.ScriptTarget.Latest,
    true,
  );

  // create a typescript transformer
  const transformer = (context: ts.TransformationContext) => {
    const visitor = (node: ts.Node): ts.Node => {
      // find the iconsets array and insert a new entry
      if (
        ts.isVariableDeclaration(node) &&
        node.name.getText() === 'iconsets' &&
        ts.isArrayLiteralExpression(node.initializer)
      ) {
        return ts.factory.createVariableDeclaration(
          node.name,
          node.exclamationToken,
          node.type,
          ts.factory.createArrayLiteralExpression([
            ...node.initializer.elements,
            ts.factory.createObjectLiteralExpression(
              [
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier('variants'),
                  ts.factory.createArrayLiteralExpression(
                    schema.svgGlob
                      ? [
                          ts.factory.createObjectLiteralExpression(
                            [
                              ts.factory.createPropertyAssignment(
                                ts.factory.createIdentifier('glob'),
                                ts.factory.createStringLiteral(schema.svgGlob),
                              ),
                            ],
                            false,
                          ),
                        ]
                      : [],
                    false,
                  ),
                ),
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier('output'),
                  ts.factory.createStringLiteral(
                    `packages/${schema.name}/src/index.ts`,
                  ),
                ),
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier('prefix'),
                  ts.factory.createStringLiteral(schema.prefix),
                ),
              ],
              true,
            ),
          ]),
        );
      }
      return ts.visitEachChild(node, visitor, context);
    };
    return (node: ts.Node) => ts.visitNode(node, visitor);
  };

  // apply the transformer
  const transformedSourceFile = ts.transform(sourceFile, [transformer]);

  // use typescript printer to print the transformed source file
  const printer = ts.createPrinter();
  const result = printer.printFile(
    transformedSourceFile.transformed[0] as ts.SourceFile,
  );

  // write the transformed source file
  tree.write(iconsetPath, result);
}
