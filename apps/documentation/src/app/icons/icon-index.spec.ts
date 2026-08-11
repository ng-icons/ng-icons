import { describe, expect, it } from 'vitest';
import {
  buildIndex,
  commonPrefix,
  groupBySet,
  iconAt,
  iconParam,
  iconStem,
  matchAcrossSets,
  resolveIconParam,
  searchIndex,
  type IconSet,
} from './icon-index';

const sets: IconSet[] = [
  {
    slug: 'lucide',
    name: 'Lucide',
    pkg: '@ng-icons/lucide',
    license: 'ISC',
    count: 3,
    variants: [{ id: 'default', subpath: '@ng-icons/lucide', count: 3 }],
  },
  {
    slug: 'heroicons',
    name: 'Heroicons',
    pkg: '@ng-icons/heroicons',
    license: 'MIT',
    count: 3,
    variants: [
      { id: 'outline', subpath: '@ng-icons/heroicons/outline', count: 2 },
      { id: 'solid', subpath: '@ng-icons/heroicons/solid', count: 1 },
    ],
  },
];

const index = buildIndex(sets, {
  lucide: { default: ['lucideArrowRight', 'lucideSettings', 'lucideTrash2'] },
  heroicons: {
    outline: ['heroArrowRight', 'heroMagnifyingGlass'],
    solid: ['heroArrowRightSolid'],
  },
});

describe('buildIndex', () => {
  it('flattens every set and variant', () => {
    expect(index.names).toHaveLength(6);
    expect(iconAt(index, 0)).toMatchObject({
      name: 'lucideArrowRight',
      set: { slug: 'lucide' },
      variant: { id: 'default' },
    });
    expect(iconAt(index, 5)).toMatchObject({
      name: 'heroArrowRightSolid',
      variant: { id: 'solid', subpath: '@ng-icons/heroicons/solid' },
    });
  });

  it('derives the constant-name prefix per set', () => {
    expect(index.prefixOf).toEqual(['lucide', 'hero']);
  });
});

describe('commonPrefix', () => {
  it('returns the shared start', () => {
    expect(commonPrefix(['featherA', 'featherB'])).toBe('feather');
  });

  it('is empty when nothing is shared', () => {
    expect(commonPrefix(['abc', 'xyz'])).toBe('');
    expect(commonPrefix([])).toBe('');
  });
});

describe('searchIndex', () => {
  it('matches a substring, case insensitively', () => {
    const { positions, fuzzy } = searchIndex(index, {
      text: 'ArrowRight',
      sets: null,
    });

    expect(positions.map(p => index.names[p])).toEqual([
      'lucideArrowRight',
      'heroArrowRight',
      'heroArrowRightSolid',
    ]);
    expect(fuzzy).toBe(false);
  });

  it('ignores spaces, dashes and underscores in the query', () => {
    const { positions } = searchIndex(index, {
      text: 'arrow_right',
      sets: null,
    });

    expect(positions).toHaveLength(3);
  });

  it('expands a synonym and reports which term it used', () => {
    const { positions, synonym } = searchIndex(index, {
      text: 'cog',
      sets: null,
    });

    expect(synonym).toBe('settings');
    expect(positions.map(p => index.names[p])).toEqual(['lucideSettings']);
  });

  it('restricts to the selected sets', () => {
    const { positions } = searchIndex(index, {
      text: 'arrowright',
      sets: new Set(['heroicons']),
    });

    expect(positions.map(p => index.names[p])).toEqual([
      'heroArrowRight',
      'heroArrowRightSolid',
    ]);
  });

  it('restricts to specific names for the favourites tab', () => {
    const { positions } = searchIndex(index, {
      text: '',
      sets: null,
      only: new Set(['lucideTrash2']),
    });

    expect(positions.map(p => index.names[p])).toEqual(['lucideTrash2']);
  });

  it('returns everything for an empty query', () => {
    expect(
      searchIndex(index, { text: '   ', sets: null }).positions,
    ).toHaveLength(6);
  });

  it('falls back to fuzzy matching only when a substring finds nothing', () => {
    const calls: string[] = [];
    const fuzzy = (term: string) => {
      calls.push(term);
      return [1];
    };

    const hit = searchIndex(index, { text: 'arrowright', sets: null }, fuzzy);
    expect(hit.fuzzy).toBe(false);
    expect(calls).toEqual([]);

    const miss = searchIndex(index, { text: 'setings', sets: null }, fuzzy);
    expect(miss.fuzzy).toBe(true);
    expect(miss.positions).toEqual([1]);
    expect(calls).toEqual(['setings']);
  });

  it('applies set filtering to fuzzy results too', () => {
    const miss = searchIndex(
      index,
      { text: 'setings', sets: new Set(['heroicons']) },
      () => [1],
    );

    expect(miss.positions).toEqual([]);
  });

  /**
   * The matcher receives the scope so it can cap its results after filtering.
   * Capping first meant a typo could return nothing when the best matches
   * across the whole library happened to sit outside the selected sets.
   */
  it('hands the scope predicate to the fuzzy matcher', () => {
    const seen: boolean[] = [];

    searchIndex(
      index,
      { text: 'setings', sets: new Set(['lucide']) },
      (_term, included) => {
        // Positions 0-2 are lucide, 3-5 are heroicons.
        seen.push(included(0), included(3));
        return [];
      },
    );

    expect(seen).toEqual([true, false]);
  });
});

describe('groupBySet', () => {
  it('groups results and lists the variants present', () => {
    const { positions } = searchIndex(index, { text: 'arrow', sets: null });
    const groups = groupBySet(index, positions);

    expect(groups.map(group => group.set.slug)).toEqual([
      'lucide',
      'heroicons',
    ]);
    expect(groups[1].variants.map(variant => variant.id)).toEqual([
      'outline',
      'solid',
    ]);
  });
});

describe('iconStem and matchAcrossSets', () => {
  it('strips the set prefix', () => {
    expect(iconStem('lucideArrowRight', 'lucide')).toBe('arrowright');
    expect(iconStem('unprefixed', 'lucide')).toBe('unprefixed');
  });

  it('finds the same glyph in another set, once per set', () => {
    const matches = matchAcrossSets(index, 0).map(p => index.names[p]);

    expect(matches).toEqual(['heroArrowRight']);
  });

  it('returns nothing when no other set names it the same way', () => {
    const settings = index.names.indexOf('lucideSettings');

    expect(matchAcrossSets(index, settings)).toEqual([]);
  });
});

/**
 * The query reaches `searchIndex` straight from the `?q=` param and the search
 * box, so it can be any string at all. With a plain-object synonym map,
 * `constructor` and `__proto__` resolved to inherited members of
 * `Object.prototype` and the search threw instead of returning results.
 */
describe('searchIndex with prototype-shaped queries', () => {
  const index = buildIndex(
    [
      {
        slug: 'lucide',
        name: 'Lucide',
        pkg: '@ng-icons/lucide',
        license: 'ISC',
        count: 2,
        variants: [{ id: 'default', subpath: '@ng-icons/lucide', count: 2 }],
      },
    ],
    { lucide: { default: ['lucideConstructor', 'lucideHeart'] } },
  );

  for (const query of ['constructor', 'toString', '__proto__', 'valueOf']) {
    it(`survives a query of "${query}"`, () => {
      const search = () =>
        searchIndex(index, { text: query, sets: null }, undefined);

      expect(search).not.toThrow();
      expect(search().synonym).toBeNull();
    });
  }

  it('still matches on a name that happens to contain such a word', () => {
    const result = searchIndex(index, { text: 'constructor', sets: null });

    expect(result.positions.map(p => index.names[p])).toEqual([
      'lucideConstructor',
    ]);
  });

  it('still resolves a real synonym', () => {
    const result = searchIndex(index, { text: 'bin', sets: null });

    expect(result.synonym).toBe('delete');
  });
});

/**
 * A bare constant name is not an identity. 5,586 of the real names appear in
 * more than one set, so `?icon=matDeleteOutline` opened whichever set the index
 * held first rather than the one that was clicked.
 */
describe('icon params', () => {
  const shared = buildIndex(
    [
      { ...sets[0], count: 1 },
      { ...sets[1], count: 1 },
    ],
    {
      lucide: { default: ['shared', 'lucideOnly'] },
      heroicons: { outline: ['shared'], solid: [] },
    },
  );

  it('qualifies a position with its set', () => {
    expect(iconParam(shared, 0)).toBe('lucide/shared');
    expect(iconParam(shared, 2)).toBe('heroicons/shared');
  });

  it('resolves back to the set that was asked for', () => {
    expect(resolveIconParam(shared, 'lucide/shared')).toBe(0);
    expect(resolveIconParam(shared, 'heroicons/shared')).toBe(2);
  });

  it('round-trips every position', () => {
    for (let position = 0; position < shared.names.length; position++) {
      expect(resolveIconParam(shared, iconParam(shared, position))).toBe(
        position,
      );
    }
  });

  /** Links shared before the set was part of the value still have to work. */
  it('accepts a bare name, resolving to the first set that has it', () => {
    expect(resolveIconParam(shared, 'shared')).toBe(0);
    expect(resolveIconParam(shared, 'lucideOnly')).toBe(1);
  });

  it('falls back to the name when the set no longer matches', () => {
    expect(resolveIconParam(shared, 'renamed-set/shared')).toBe(0);
  });

  it('returns null for something that is not an icon at all', () => {
    expect(resolveIconParam(shared, 'nope')).toBeNull();
    expect(resolveIconParam(shared, 'lucide/nope')).toBeNull();
  });
});
