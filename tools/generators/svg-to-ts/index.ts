import { formatFiles, names, Tree } from '@nrwl/devkit';
import { readFile } from 'fs-extra';
import { sync } from 'glob';
import { basename } from 'path';
import { AddAttributesToSVGElementPlugin, optimize, Plugin } from 'svgo';
import * as ts from 'typescript';
import { Iconset, iconsets } from './iconsets';

let iconCount = 0;

function fileNameFormatter(name: string, prefix: string) {
  return prefix + '-' + names(basename(name, '.svg')).fileName;
}

async function loadIconset(iconset: Iconset): Promise<Record<string, string>> {
  // load all the svg iconDetails within the path
  const iconDetails: IconDetails[] = [];

  for (const variant of iconset.variants) {
    const dirFiles = sync(variant.glob).map<IconDetails>(path => ({
      name: variant.formatter
        ? variant.formatter(
            fileNameFormatter(path, iconset.prefix),
            path,
            iconset.prefix,
          )
        : fileNameFormatter(path, iconset.prefix),
      path,
    }));

    iconDetails.push(...dirFiles);
  }

  if (iconDetails.length === 0) {
    throw new Error('No icons found for iconset: ' + iconset.variants);
  }

  iconCount += iconDetails.length;

  console.log(
    'Found ' +
      iconDetails.length +
      ' icons in ' +
      iconset.variants.map(variant => variant.glob).join(', '),
  );

  // read the contents of each file
  const output: Record<string, string> = {};

  for (const iconDetail of iconDetails) {
    const iconName = names(iconDetail.name).className;
    let svg = await readFile(iconDetail.path, 'utf8');

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
                } else {
                  // if this is not the svg element remove the stroke property
                  if (
                    iconset.svg?.removeStroke &&
                    node.attributes['stroke-width']
                  ) {
                    delete node.attributes['stroke'];
                  }
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

    if (iconset.svg?.colorAttr) {
      plugins.push({
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              [iconset.svg!.colorAttr]: 'currentColor',
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

  return output.join('\n');
}

export async function iconGenerator(tree: Tree): Promise<void> {
  for (const iconset of iconsets) {
    // if there is no path then skip
    if (!iconset.variants || iconset.variants.length === 0) {
      console.warn('⚠️ Skipping iconset because there are no paths defined');
      continue;
    }

    tree.write(iconset.output, await createIconset(iconset));
  }

  console.log(`✅ Generated ${iconCount} icons.`);

  await formatFiles(tree);
}

interface IconDetails {
  name: string;
  path: string;
}

export default iconGenerator;
