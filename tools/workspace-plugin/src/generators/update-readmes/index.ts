import { formatFiles, getProjects, joinPathFragments, Tree } from '@nx/devkit';

/**
 * A package can keep a `README.notice.md` next to its `package.json`. Its
 * contents are placed above the shared README, so a package can carry a notice
 * (for example that it is frozen) without the next run wiping it out.
 */
const NOTICE_FILE = 'README.notice.md';

export default async function (tree: Tree) {
  // read the root readme
  const readme = tree.read('README.md')!.toString();

  for (const [, configuration] of getProjects(tree)) {
    if (configuration.projectType === 'library') {
      const path = joinPathFragments(configuration.root, 'README.md');
      const noticePath = joinPathFragments(configuration.root, NOTICE_FILE);

      tree.write(
        path,
        tree.exists(noticePath)
          ? `${tree.read(noticePath)!.toString().trim()}\n\n${readme}`
          : readme,
      );
    }
  }

  await formatFiles(tree);
}
