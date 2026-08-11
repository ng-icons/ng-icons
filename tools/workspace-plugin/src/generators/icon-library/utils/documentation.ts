import { logger, Tree } from '@nx/devkit';
import { Schema } from '../schema';

const SET_META_PATH = 'apps/documentation/tools/set-meta.ts';

/**
 * Registers the new set's display metadata with the documentation site.
 *
 * The site discovers sets and their variants from the workspace's TypeScript
 * paths, so a new package shows up in the browser on its own. All it needs here
 * is the display name, website and licence; without an entry it still appears,
 * under a title-cased version of its slug and with no website link.
 */
export function addIconsetDocumentation(tree: Tree, schema: Schema): void {
  const source = tree.read(SET_META_PATH, 'utf-8');

  if (source === null) {
    throw new Error(`Could not read ${SET_META_PATH}`);
  }

  const key = `'@ng-icons/${schema.name}'`;

  if (source.includes(`${key}:`)) {
    logger.info(`${key} is already listed in ${SET_META_PATH}.`);
    return;
  }

  const entry = [
    `  ${key}: {`,
    `    name: '${title(schema.name)}',`,
    // The site renders the website as its own link text, so it carries no
    // protocol and no trailing slash.
    `    website: '${host(schema.website)}',`,
    `    license: '${schema.license}',`,
    `  },`,
  ].join('\n');

  const lines = source.split('\n');
  // Entries are one per key in alphabetical order; find the first that sorts
  // after this one, and fall back to the end of the object literal.
  const at = lines.findIndex(
    line =>
      /^ {2}'@ng-icons\/[^']+':/.test(line) &&
      line.trim().localeCompare(key) > 0,
  );
  const closing = lines.findIndex(line => line === '};');

  lines.splice(at === -1 ? closing : at, 0, entry);

  tree.write(SET_META_PATH, lines.join('\n'));

  logger.info(
    `⚠️ Please check the display name for ${key} in ${SET_META_PATH}.`,
  );
}

/** `material-symbols` -> `Material Symbols`, as a starting point to correct. */
function title(name: string): string {
  return name
    .split(/[-_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** `https://example.com/` -> `example.com` */
function host(website: string): string {
  return website.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
