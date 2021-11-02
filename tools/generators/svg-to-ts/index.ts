import { formatFiles, joinPathFragments, names, Tree } from '@nrwl/devkit';
import { readdir, readFile } from 'fs-extra';
import { basename, extname } from 'path';
import { AddAttributesToSVGElementPlugin, optimize } from 'svgo';
import * as ts from 'typescript';

async function loadIconset(iconset: Iconset): Promise<Record<string, string>> {
  // load all the svg files within the path
  const files = (await readdir(iconset.from)).filter(
    file => extname(file) === '.svg',
  );

  // read the contents of each file
  const output: Record<string, string> = {};

  for (const file of files) {
    const iconName = names(
      iconset.prefix +
        '-' +
        basename(file, '.svg') +
        names(iconset.suffix ?? '').className,
    ).className;
    let svg = await readFile(joinPathFragments(iconset.from, file), 'utf8');

    if (iconset.colorAttr) {
      svg = optimize(svg, {
        plugins: [
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [
                {
                  [iconset.colorAttr]: 'currentColor',
                },
              ],
            },
          } as AddAttributesToSVGElementPlugin,
        ],
      }).data;
    }

    output[iconName] = svg;
  }

  return output;
}

function createIconDeclaration(name: string, svg: string): ts.Node {
  return ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(names(name).className),
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
    const content = printer.printNode(
      ts.EmitHint.Unspecified,
      node,
      sourceFile,
    );
    output.push(content);
  }

  return output.join('\n');
}

interface Iconset {
  from: string;
  to: string;
  prefix: string;
  suffix?: string;
  colorAttr?: 'fill' | 'stroke';
}

export async function iconGenerator(tree: Tree): Promise<void> {
  const iconsets = await import('./iconsets.json');

  for (const iconset of iconsets as Iconset[]) {
    if (tree.exists(iconset.to)) {
      tree.delete(iconset.to);
    }

    tree.write(iconset.to, await createIconset(iconset));
  }

  await formatFiles(tree);
}

export default iconGenerator;
