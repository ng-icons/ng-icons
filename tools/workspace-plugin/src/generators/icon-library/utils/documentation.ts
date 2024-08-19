import { logger, names, Tree } from '@nx/devkit';
import { ast, print, query, replace } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
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
      .map(entrypoint => names(entrypoint.trim()).fileName)
      .filter(Boolean) ?? [];

  let iconsetAst: ts.ObjectLiteralExpression;

  if (entrypoints.length === 0) {
    const defintion = ast(`const iconset = {
      name: '${schema.name}',
      website: '${schema.website}',
      icon: 'TODO',
      license: '${schema.license}',
      package: '@ng-icons/${schema.name}',
      icons: async () => {
        return { default: await import('@ng-icons/${schema.name}') };
      },
    }`);

    iconsetAst = query<ts.ObjectLiteralExpression>(
      defintion,
      'VariableDeclaration:has(Identifier[name="iconset"]) > ObjectLiteralExpression',
    )[0];
  } else {
    const definition = ast(`const iconset = {
      name: '${schema.name}',
      website: '${schema.website}',
      icon: 'TODO',
      license: '${schema.license}',
      package: '@ng-icons/${schema.name}',
      icons: async () => {
        const [${entrypoints.join(', ')}] = await Promise.all([
          ${entrypoints.map(entrypoint => `import('@ng-icons/${schema.name}/${entrypoint}')`).join(',\n')}
        ]);
        return { ${entrypoints.join(', ')} };
      },
    }`);

    iconsetAst = query<ts.ObjectLiteralExpression>(
      definition,
      'ObjectLiteralExpression',
    )[0];
  }

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
