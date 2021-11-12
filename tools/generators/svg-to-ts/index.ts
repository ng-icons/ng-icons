import { formatFiles, joinPathFragments, names, Tree } from '@nrwl/devkit';
import { readdir, readFile } from 'fs-extra';
import { basename, extname } from 'path';
import { AddAttributesToSVGElementPlugin, optimize, Plugin } from 'svgo';
import * as ts from 'typescript';

async function loadIconset(iconset: Iconset): Promise<Record<string, string>> {
  // load all the svg files within the path
  const files = (await readdir(iconset.from)).filter(
    file => extname(file) === '.svg',
  );

  if (files.length === 0) {
    throw new Error('No icons found for iconset: ' + iconset.from);
  }

  console.log('Found ' + files.length + ' icons in ' + iconset.from);

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

    const plugins = [
      {
        name: 'insertCssVariables',
        type: 'visitor',
        description: 'Insert CSS variables',
        params: {},
        fn: function (data) {
          return {
            element: {
              enter: node => {
                if (node.name === 'svg') {
                  delete node.attributes['width'];
                  delete node.attributes['height'];

                  node.style.setProperty(
                    'width',
                    'var(--ng-icon__size, 1em)',
                    '',
                  );

                  node.style.setProperty(
                    'height',
                    'var(--ng-icon__size, 1em)',
                    '',
                  );
                }

                if (node.attributes['stroke-width']) {
                  node.style.setProperty(
                    'stroke-width',
                    `var(--ng-icon__stroke-width, ${node.attributes['stroke-width']})`,
                    '',
                  );

                  delete node.attributes['stroke-width'];
                }
              },
            },
          };
        },
      } as Plugin,
    ];

    if (iconset.colorAttr) {
      plugins.push({
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              [iconset.colorAttr]: 'currentColor',
            },
          ],
        },
      } as AddAttributesToSVGElementPlugin);
    }

    const result = await optimize(svg, { plugins: plugins as Plugin[] });
    output[iconName] = result.data;
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

  console.log(output.join('\n'));

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
  const iconsets = JSON.parse(
    tree
      .read(
        joinPathFragments('tools', 'generators', 'svg-to-ts', 'iconsets.json'),
      )
      .toString(),
  );

  for (const iconset of iconsets as Iconset[]) {
    if (tree.exists(iconset.to)) {
      tree.delete(iconset.to);
    }

    tree.write(iconset.to, await createIconset(iconset));
  }

  await formatFiles(tree);
}

export default iconGenerator;
