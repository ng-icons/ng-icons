import { logger, names, Tree } from '@nx/devkit';
import { print, replace } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
import { factory } from 'typescript';
import { Schema } from '../schema';

export function addIconsetDocumentation(tree: Tree, schema: Schema): void {
  // read the apps/documentation/src/app/browse-icons/browse-icons.component.ts file
  const browseIcons = tree.read(
    'apps/documentation/src/app/browse-icons/browse-icons.component.ts',
    'utf-8',
  );

  const entrypoints =
    schema.entrypoints
      ?.split(',')
      .map(entrypoint => names(entrypoint.trim()).fileName) ?? [];

  let loader: ts.ArrowFunction;

  if (entrypoints.length === 0) {
    loader = factory.createArrowFunction(
      [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
      undefined,
      [],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        [
          factory.createReturnStatement(
            factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(
                  factory.createIdentifier('default'),
                  factory.createAwaitExpression(
                    factory.createCallExpression(
                      factory.createToken(ts.SyntaxKind.ImportKeyword) as any,
                      undefined,
                      [factory.createStringLiteral(`@ng-icons/${schema.name}`)],
                    ),
                  ),
                ),
              ],
              false,
            ),
          ),
        ],
        true,
      ),
    );
  } else {
    loader = factory.createArrowFunction(
      [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
      undefined,
      [],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        [
          factory.createVariableStatement(
            undefined,
            factory.createVariableDeclarationList(
              [
                factory.createVariableDeclaration(
                  factory.createArrayBindingPattern(
                    entrypoints.map(entrypoint =>
                      factory.createBindingElement(
                        undefined,
                        undefined,
                        factory.createIdentifier(entrypoint),
                        undefined,
                      ),
                    ),
                  ),
                  undefined,
                  undefined,
                  factory.createAwaitExpression(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier('Promise'),
                        factory.createIdentifier('all'),
                      ),
                      undefined,
                      [
                        factory.createArrayLiteralExpression(
                          entrypoints.map(entrypoint =>
                            factory.createAwaitExpression(
                              factory.createCallExpression(
                                factory.createToken(
                                  ts.SyntaxKind.ImportKeyword,
                                ) as any,
                                undefined,
                                [
                                  factory.createStringLiteral(
                                    `@ng-icons/${schema.name}/${entrypoint}`,
                                  ),
                                ],
                              ),
                            ),
                          ),
                          true,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
              ts.NodeFlags.Const |
                ts.NodeFlags.Constant |
                ts.NodeFlags.AwaitContext |
                ts.NodeFlags.Constant |
                ts.NodeFlags.ContextFlags |
                ts.NodeFlags.TypeExcludesFlags,
            ),
          ),
          factory.createReturnStatement(
            factory.createObjectLiteralExpression(
              entrypoints.map(entrypoint =>
                factory.createShorthandPropertyAssignment(
                  factory.createIdentifier(entrypoint),
                  undefined,
                ),
              ),
              false,
            ),
          ),
        ],
        true,
      ),
    );
  }

  const iconsetAst = factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        factory.createIdentifier('name'),
        factory.createStringLiteral(schema.name),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('website'),
        factory.createStringLiteral(schema.website),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('icon'),
        factory.createStringLiteral('TODO'),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('license'),
        factory.createStringLiteral(schema.license),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('package'),
        factory.createStringLiteral(`@ng-icons/${schema.name}`),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('icons'),
        loader,
      ),
    ],
    true,
  );

  const iconsets = replace(
    browseIcons,
    'ClassDeclaration:has(Identifier[name="BrowseIconsComponent"]) > PropertyDeclaration:has(Identifier[name="iconsets"]) > ArrayLiteralExpression',
    iconset => {
      if (!ts.isArrayLiteralExpression(iconset)) {
        throw new Error('Expected iconsets to be an array literal expression');
      }

      // insert the iconset object into the iconsets array
      const output = ts.factory.updateArrayLiteralExpression(iconset, [
        ...iconset.elements,
        iconsetAst,
      ]);

      return print(output);
    },
  );

  // write the updated file
  tree.write(
    'apps/documentation/src/app/browse-icons/browse-icons.component.ts',
    iconsets,
  );

  logger.info(
    '⚠️ Please update the icon in apps/documentation/src/app/browse-icons/browse-icons.component.ts.',
  );
}
