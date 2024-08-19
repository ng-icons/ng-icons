import { logger, names, Tree } from '@nx/devkit';
import { ast, print, replace } from '@phenomnomnominal/tsquery';
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
      .map(entrypoint => names(entrypoint.trim()).fileName) ?? [];

  let iconsetAst: ts.ObjectLiteralExpression;

  if (entrypoints.length === 0) {
    iconsetAst = ast(`{
      name: '${schema.name}',
      website: '${schema.website}',
      icon: 'TODO',
      license: '${schema.license}',
      package: '@ng-icons/${schema.name}',
      icons: async () => {
        return { default: await import('@ng-icons/${schema.name}') };
      },
    }`).statements[0] as unknown as ts.ObjectLiteralExpression;
  } else {
    iconsetAst = ast(`{
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
    }`).statements[0] as unknown as ts.ObjectLiteralExpression;
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
