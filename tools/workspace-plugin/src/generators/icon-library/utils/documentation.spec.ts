import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { describe, expect, it } from 'vitest';
import { Schema } from '../schema';
import { addIconsetDocumentation } from './documentation';

const SET_META_PATH = 'apps/documentation/tools/set-meta.ts';

const EXISTING = `export const SET_META: Record<string, SetMeta> = {
  '@ng-icons/akar-icons': {
    name: 'Akar Icons',
    website: 'akaricons.com',
    license: 'MIT',
  },
  '@ng-icons/lucide': {
    name: 'Lucide',
    website: 'lucide.dev',
    license: 'ISC',
  },
};
`;

function setup(): Tree {
  const tree = createTreeWithEmptyWorkspace();
  tree.write(SET_META_PATH, EXISTING);
  return tree;
}

const read = (tree: Tree) => tree.read(SET_META_PATH, 'utf-8') ?? '';

const schema = (name: string, website: string): Schema => ({
  name,
  website,
  license: 'MIT',
  prefix: name,
});

describe('addIconsetDocumentation', () => {
  it('inserts the entry in alphabetical order', () => {
    const tree = setup();

    addIconsetDocumentation(tree, schema('feather-icons', 'feathericons.com'));

    const keys = [...read(tree).matchAll(/'(@ng-icons\/[^']+)':/g)].map(
      ([, key]) => key,
    );

    expect(keys).toEqual([
      '@ng-icons/akar-icons',
      '@ng-icons/feather-icons',
      '@ng-icons/lucide',
    ]);
  });

  it('appends when the new set sorts last', () => {
    const tree = setup();

    addIconsetDocumentation(
      tree,
      schema('typicons', 'https://s-ings.com/typicons/'),
    );

    const source = read(tree);

    expect(source).toContain(`  '@ng-icons/typicons': {
    name: 'Typicons',
    website: 's-ings.com/typicons',
    license: 'MIT',
  },
};`);
  });

  it('title-cases the slug and strips the protocol from the website', () => {
    const tree = setup();

    addIconsetDocumentation(
      tree,
      schema('material-symbols', 'http://fonts.google.com/icons'),
    );

    const source = read(tree);

    expect(source).toContain("name: 'Material Symbols'");
    expect(source).toContain("website: 'fonts.google.com/icons'");
  });

  /** Re-running the generator for an existing set should not duplicate it. */
  it('leaves an already-listed set alone', () => {
    const tree = setup();

    addIconsetDocumentation(tree, schema('lucide', 'lucide.dev'));

    expect(tree.read(SET_META_PATH, 'utf-8')).toBe(EXISTING);
  });
});
