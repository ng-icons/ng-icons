import { Tree } from '@nx/devkit';

function read(tree: Tree, path: string): string {
  const contents = tree.read(path);
  if (!contents) {
    throw new Error(`Could not read ${path}`);
  }
  return contents.toString('utf-8');
}

export function updateIconCounts(tree: Tree, count: number): void {
  // round the count down to the nearest hundred
  count = Math.floor(count / 100) * 100;

  // convert the number to a human-readable string e.g. 56,000
  const countString = count.toLocaleString();

  // update the icon count in the root readme file
  const readme = read(tree, 'README.md');

  // the text in the readme is formatted as follows:
  // Containing over 56,000 icons
  // we need to replace the number in this string with the new count
  const updatedReadme = readme.replace(
    /Containing over [\d,]+ icons/,
    `Containing over ${countString} icons`,
  );

  tree.write('README.md', updatedReadme);

  // The documentation site no longer needs updating here: it reads the real
  // counts from `virtual:icon-stats`, which the icon-data Vite plugin computes
  // from the generated entry points at build time.
}
