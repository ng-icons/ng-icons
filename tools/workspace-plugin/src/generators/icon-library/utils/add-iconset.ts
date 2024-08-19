import { logger, Tree } from '@nx/devkit';
import { print, replace } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
import { factory } from 'typescript';
import { Schema } from '../schema';

export function addIconset(tree: Tree, schema: Schema): void {
  const iconsets = tree.read(
    'tools/workspace-plugin/src/generators/svg-to-ts/iconsets.ts',
    'utf-8',
  );

  const entrypoints =
    schema.entrypoints
      ?.split(',')
      .map(e => e.trim())
      .filter(Boolean) ?? [];

  const updatedIconsets = replace(
    iconsets,
    'VariableDeclaration:has(Identifier[name="iconsets"]) > ArrayLiteralExpression',
    array => {
      if (!ts.isArrayLiteralExpression(array)) {
        throw new Error('Expected an array literal expression');
      }

      const output = ts.factory.createArrayLiteralExpression([
        ...array.elements,
        ...(entrypoints.length === 0
          ? [createEntry(schema.name, schema.prefix)]
          : entrypoints.map(entrypoint =>
              createEntry(schema.name, schema.prefix, entrypoint),
            )),
      ]);

      return print(output);
    },
  );

  tree.write(
    'tools/workspace-plugin/src/generators/svg-to-ts/iconsets.ts',
    updatedIconsets,
  );

  logger.info(
    '⚠️ Please update the glob in tools/workspace-plugin/src/generators/svg-to-ts/iconsets.ts',
  );
}

function createEntry(library: string, prefix: string, entrypoint?: string) {
  const path = entrypoint ? `${library}/${entrypoint}` : library;

  return factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        factory.createIdentifier('glob'),
        factory.createStringLiteral('TODO'),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('output'),
        factory.createStringLiteral(`packages/${path}/src/index.ts`),
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier('getIconName'),
        factory.createArrowFunction(
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              factory.createIdentifier('name'),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
              undefined,
            ),
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createTemplateExpression(
            factory.createTemplateHead(prefix, prefix),
            [
              factory.createTemplateSpan(
                factory.createIdentifier('name'),
                factory.createTemplateTail('', ''),
              ),
            ],
          ),
        ),
      ),
    ],
    true,
  );
}
