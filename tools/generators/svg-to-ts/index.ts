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

const iconsets: Iconset[] = [
  {
    from: joinPathFragments('node_modules', 'heroicons', 'outline'),
    to: joinPathFragments('packages', 'heroicons', 'src', 'outline.ts'),
    prefix: 'hero',
  },
  {
    from: joinPathFragments('node_modules', 'heroicons', 'solid'),
    to: joinPathFragments('packages', 'heroicons', 'src', 'solid.ts'),
    prefix: 'hero',
    suffix: 'solid',
  },
  {
    from: joinPathFragments('node_modules', 'feather-icons', 'dist', 'icons'),
    to: joinPathFragments('packages', 'feather-icons', 'src', 'index.ts'),
    prefix: 'feather',
  },
  {
    from: joinPathFragments('node_modules', 'jam-icons', 'svg'),
    to: joinPathFragments('packages', 'jam-icons', 'src', 'index.ts'),
    prefix: 'jam',
    colorAttr: 'fill',
  },
  {
    from: joinPathFragments('node_modules', 'octicons', 'build', 'svg'),
    to: joinPathFragments('packages', 'octicons', 'src', 'index.ts'),
    prefix: 'oct',
    colorAttr: 'fill',
  },
  {
    from: joinPathFragments('packages', 'radix-icons', 'svg'),
    to: joinPathFragments('packages', 'radix-icons', 'src', 'index.ts'),
    prefix: 'radix',
  },
];

export default async function (tree: Tree): Promise<void> {
  for (const iconset of iconsets) {
    if (tree.exists(iconset.to)) {
      tree.delete(iconset.to);
    }

    tree.write(iconset.to, await createIconset(iconset));
  }

  await formatFiles(tree);
}
