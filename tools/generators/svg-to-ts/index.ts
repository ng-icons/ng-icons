import { formatFiles, joinPathFragments, names, Tree } from '@nrwl/devkit';
import { readFile } from 'fs-extra';
import { sync } from 'glob';
import { basename } from 'path';
import * as ts from 'typescript';
import { Iconset, iconsets } from './iconsets';
import { optimizeIcon } from './optimize-icon';

let iconCount = 0;

const iconList = new Set<string>();

async function loadIconset(iconset: Iconset): Promise<Record<string, string>> {
  // load all the svg iconDetails within the path
  const iconPaths = sync(iconset.glob);

  if (iconPaths.length === 0) {
    throw new Error('No icons found for iconset: ' + iconset.glob);
  }

  console.log('Found ' + iconPaths.length + ' icons in ' + iconset.glob);

  // read the contents of each file
  const output: Record<string, string> = {};

  for (const iconPath of iconPaths) {
    const iconName = iconset.getIconName(
      names(basename(iconPath, '.svg')).className,
      iconPath,
    );
    let svg = await readFile(iconPath, 'utf8');
    svg = await optimizeIcon(svg, iconset.svg);
    output[iconName] = svg;

    iconList.add(iconName);
  }

  iconCount += iconPaths.length;

  return output;
}

function createIconDeclaration(name: string, svg: string): ts.Node {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(names(name).propertyName),
          undefined,
          undefined,
          ts.factory.createNoSubstitutionTemplateLiteral(svg.trim()),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

async function createIconset(iconset: Iconset): Promise<string> {
  const icons = await loadIconset(iconset);
  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile(
    'icons.ts',
    '',
    ts.ScriptTarget.ESNext,
  );

  const output: string[] = [];

  for (const icon in icons) {
    const node = createIconDeclaration(icon, icons[icon]);

    // if the iconset is deprecated, add a comment to the icon
    if (iconset.deprecated) {
      const comment = `* @deprecated ${iconset.deprecatedMessage} `;
      ts.addSyntheticLeadingComment(
        node,
        ts.SyntaxKind.MultiLineCommentTrivia,
        comment,
        true,
      );
    }

    const content = printer.printNode(
      ts.EmitHint.Unspecified,
      node,
      sourceFile,
    );
    output.push(content);
  }

  return output.join('\n');
}

function getHyphenatedName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();
}

async function generateIconNameType(tree: Tree): Promise<void> {
  const iconNamesType = `export type IconName = ${Array.from(iconList)
    .map(name => `'${name}'`)
    .join(' | ')};`;

  tree.write(
    joinPathFragments('packages', 'core', 'src', 'lib', 'icon-name.ts'),
    iconNamesType,
  );
}

export async function iconGenerator(tree: Tree): Promise<void> {
  for (const iconset of iconsets) {
    tree.write(iconset.output, await createIconset(iconset));
  }

  await generateIconNameType(tree);

  console.log(`✅ Generated ${iconCount} icons.`);

  await formatFiles(tree);
}

export default iconGenerator;
