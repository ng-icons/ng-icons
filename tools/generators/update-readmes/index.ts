import { getProjects, joinPathFragments, Tree } from '@nrwl/devkit';

export default async function (tree: Tree) {
  // read the root readme
  const readme = tree.read('README.md')!.toString();

  for (const [name, configuration] of getProjects(tree)) {
    if (configuration.projectType === 'library') {
      const path = joinPathFragments(configuration.root, 'README.md');
      tree.write(path, readme);
    }
  }
}
