import { formatFiles, joinPathFragments, names, Tree } from '@nx/devkit';
import { execSync } from 'child_process';
import { mkdtempSync, rmSync } from 'fs';
import { readFile } from 'fs-extra';
import { sync } from 'glob';
import { tmpdir } from 'os';
import { basename, join } from 'path';
import * as ts from 'typescript';
import { Iconset, iconsets } from './iconsets';
import { optimizeIcon } from './optimize-icon';
import { updateIconCounts } from './update-counts';

let iconCount = 0;

const iconList = new Set<string>();

interface GitCloneResult {
  tmpDir: string;
  cleanup: () => void;
}

function cloneGitRepo(gitRepo: string, gitRef: string): GitCloneResult {
  const tmpDir = mkdtempSync(join(tmpdir(), 'ng-icons-'));

  try {
    console.log(`Cloning ${gitRepo} (${gitRef}) to ${tmpDir}...`);
    // Use minimal clone: depth 1, single branch, no tags
    execSync(
      `git clone --depth 1 --single-branch --no-tags --branch ${gitRef} ${gitRepo} ${tmpDir}`,
      { stdio: 'pipe' },
    );
  } catch (error) {
    // If branch clone fails, try fetching specific commit with minimal history
    try {
      execSync(`git init ${tmpDir}`, { stdio: 'pipe' });
      execSync(`git -C ${tmpDir} remote add origin ${gitRepo}`, {
        stdio: 'pipe',
      });
      execSync(`git -C ${tmpDir} fetch --depth 1 origin ${gitRef}`, {
        stdio: 'pipe',
      });
      execSync(`git -C ${tmpDir} checkout FETCH_HEAD`, { stdio: 'pipe' });
    } catch (innerError) {
      rmSync(tmpDir, { recursive: true, force: true });
      throw new Error(`Failed to clone ${gitRepo}: ${error}`);
    }
  }

  return {
    tmpDir,
    cleanup: () => {
      try {
        rmSync(tmpDir, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup ${tmpDir}:`, error);
      }
    },
  };
}

async function loadIconset(iconset: Iconset): Promise<Record<string, string>> {
  let gitClone: GitCloneResult | null = null;
  let globPattern = iconset.glob;

  // If this iconset uses a git repository, clone it first
  if (iconset.gitRepo && iconset.gitRef) {
    gitClone = cloneGitRepo(iconset.gitRepo, iconset.gitRef);

    // Update glob pattern to point to the cloned repo
    const basePath = iconset.gitPath
      ? join(gitClone.tmpDir, iconset.gitPath)
      : gitClone.tmpDir;

    // Extract the pattern part from the original glob (everything after the last fixed directory)
    const globParts = iconset.glob.split('/');
    const patternIndex = globParts.findIndex(
      part => part.includes('*') || part.includes('?'),
    );
    const pattern =
      patternIndex >= 0 ? globParts.slice(patternIndex).join('/') : '**/*.svg';

    globPattern = join(basePath, pattern);
  }

  try {
    // load all the svg iconDetails within the path
    let iconPaths = sync(globPattern);

    // if there is a filter, apply it
    if (iconset.filter) {
      iconPaths = iconPaths.filter(iconset.filter);
    }

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
      svg = await optimizeIcon(svg, iconset.svg, iconset.plugins);
      output[iconName] = svg;

      iconList.add(iconName);
    }

    iconCount += iconPaths.length;

    return output;
  } finally {
    // Cleanup cloned repository if it exists
    if (gitClone) {
      gitClone.cleanup();
    }
  }
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

async function generateIconNameType(tree: Tree): Promise<void> {
  const sortedNames = Array.from(iconList).sort((a, b) => a.localeCompare(b));
  const union = sortedNames.length
    ? sortedNames.map(name => `'${name}'`).join(' | ')
    : 'never';
  const iconNamesType = `export type IconName = ${union};`;

  tree.write(
    joinPathFragments(
      'packages',
      'core',
      'src',
      'lib',
      'components',
      'icon',
      'icon-name.ts',
    ),
    iconNamesType,
  );
}

async function processIconsetsInParallel(
  tree: Tree,
  iconsets: Iconset[],
  concurrency = 5,
): Promise<void> {
  // Process iconsets in batches for parallel execution
  for (let i = 0; i < iconsets.length; i += concurrency) {
    const batch = iconsets.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map(async iconset => {
        const content = await createIconset(iconset);
        return { iconset, content };
      }),
    );

    // Write results to tree
    for (const { iconset, content } of results) {
      tree.write(iconset.output, content);
    }
  }
}

export async function iconGenerator(tree: Tree): Promise<void> {
  // Process iconsets in parallel batches of 5
  await processIconsetsInParallel(tree, iconsets, 5);

  await generateIconNameType(tree);
  updateIconCounts(tree, iconCount);

  console.log(`✅ Generated ${iconCount} icons.`);

  await formatFiles(tree);
}

export default iconGenerator;
