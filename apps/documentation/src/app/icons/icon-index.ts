/**
 * The searchable icon index and the pure functions that operate on it.
 *
 * Names for every set are held in parallel arrays rather than an array of
 * objects: there are over 100,000 of them, and this keeps both the allocation
 * and the substring scan cheap enough to run on every keystroke.
 */

export interface IconVariant {
  id: string;
  /** Import path a consumer writes, e.g. `@ng-icons/heroicons/outline`. */
  subpath: string;
  count: number;
}

export interface IconSet {
  slug: string;
  name: string;
  pkg: string;
  website?: string;
  license: string;
  count: number;
  variants: IconVariant[];
}

export interface IconIndex {
  sets: IconSet[];
  /** Icon names, in set then variant then declaration order. */
  names: string[];
  /** `names`, lowercased once so searching never re-lowercases. */
  lower: string[];
  /** Index into `sets` for each name. */
  setOf: Int32Array;
  /** Index into `sets[setOf[i]].variants` for each name. */
  variantOf: Int32Array;
  /**
   * Lowercase constant-name prefix per set (`feather`, `hero`, `matSymbol`),
   * derived from the names themselves and used to match an icon across sets.
   */
  prefixOf: string[];
}

export interface IconRef {
  name: string;
  set: IconSet;
  variant: IconVariant;
}

/** Names for one set, keyed by variant id, as served in `<set>.names.json`. */
export type SetNames = Record<string, string[]>;

export function buildIndex(
  sets: IconSet[],
  namesBySet: Record<string, SetNames>,
): IconIndex {
  const names: string[] = [];
  const lower: string[] = [];
  const setOf: number[] = [];
  const variantOf: number[] = [];
  const prefixOf: string[] = [];

  sets.forEach((set, setIndex) => {
    const start = names.length;
    set.variants.forEach((variant, variantIndex) => {
      for (const name of namesBySet[set.slug]?.[variant.id] ?? []) {
        names.push(name);
        lower.push(name.toLowerCase());
        setOf.push(setIndex);
        variantOf.push(variantIndex);
      }
    });
    prefixOf.push(commonPrefix(lower.slice(start)));
  });

  return {
    sets,
    names,
    lower,
    setOf: Int32Array.from(setOf),
    variantOf: Int32Array.from(variantOf),
    prefixOf,
  };
}

export function iconAt(index: IconIndex, position: number): IconRef {
  const set = index.sets[index.setOf[position]];
  return {
    name: index.names[position],
    set,
    variant: set.variants[index.variantOf[position]],
  };
}

/** Longest prefix shared by every value, or '' when they share nothing. */
export function commonPrefix(values: string[]): string {
  if (values.length === 0) {
    return '';
  }
  let prefix = values[0];
  for (const value of values) {
    let length = 0;
    while (
      length < prefix.length &&
      length < value.length &&
      prefix[length] === value[length]
    ) {
      length++;
    }
    prefix = prefix.slice(0, length);
    if (prefix === '') {
      break;
    }
  }
  return prefix;
}

/**
 * The part of an icon's name that identifies the glyph rather than the set, so
 * `lucideArrowRight` and `heroArrowRight` both reduce to `arrowright`.
 *
 * ponytail: prefix stripping only. It pairs the same glyph across sets that
 * agree on naming, which is most of them; a synonym-aware matcher would only
 * be worth it if the panel starts looking empty.
 */
export function iconStem(name: string, prefix: string): string {
  const lower = name.toLowerCase();
  return lower.startsWith(prefix) ? lower.slice(prefix.length) : lower;
}

/** Positions of the same glyph in other sets, best match per set. */
export function matchAcrossSets(
  index: IconIndex,
  position: number,
  limit = 8,
): number[] {
  const stem = iconStem(
    index.names[position],
    index.prefixOf[index.setOf[position]],
  );
  if (!stem) {
    return [];
  }

  const origin = index.setOf[position];
  const bySet = new Map<number, number>();
  for (let i = 0; i < index.lower.length; i++) {
    const set = index.setOf[i];
    if (set === origin || bySet.has(set)) {
      continue;
    }
    // `index.lower` is what `iconStem` would produce anyway, so this scans the
    // prebuilt lowercase names instead of allocating ~100k new strings on every
    // open of the detail sheet.
    const lower = index.lower[i];
    const prefix = index.prefixOf[set];
    const candidate = lower.startsWith(prefix)
      ? lower.slice(prefix.length)
      : lower;

    if (candidate === stem) {
      bySet.set(set, i);
      if (bySet.size >= limit) {
        break;
      }
    }
  }
  return [...bySet.values()];
}

/**
 * Words people search for that aren't in any icon's name.
 *
 * Null-prototype, so a lookup only ever finds a synonym that was put here.
 * A plain object inherits from `Object.prototype`, which made searching for
 * `constructor`, `toString` or `__proto__` return a function and throw when the
 * search treated it as a string. The query comes from the URL and the keyboard,
 * so those are all reachable.
 */
export const SYNONYMS: Record<string, string> = Object.assign(
  Object.create(null) as Record<string, string>,
  {
    basket: 'shopping',
    bin: 'delete',
    cart: 'shopping',
    cog: 'settings',
    envelope: 'mail',
    gear: 'settings',
    letter: 'mail',
    loupe: 'search',
    magnifier: 'search',
    'magnifying glass': 'search',
    photo: 'camera',
    picture: 'image',
    rubbish: 'delete',
    trash: 'delete',
    tick: 'check',
  },
);

/**
 * The `?icon=` value identifying a position, as `set/variant/name`.
 *
 * A name on its own is not an identity. 5,586 of the constant names appear in
 * more than one set, and 23 appear in more than one variant of the same set
 * (`matDeleteOutline` is in both Material Icons' baseline and outline), so a
 * bare name resolved to whichever came first in the index rather than the one
 * that was clicked. The variant matters as much as the set: it decides both the
 * SVG shown and the import path offered.
 */
export function iconParam(index: IconIndex, position: number): string {
  const set = index.sets[index.setOf[position]];
  const variant = set.variants[index.variantOf[position]];
  return `${set.slug}/${variant.id}/${index.names[position]}`;
}

/**
 * The position a `?icon=` value refers to, or null when nothing matches.
 *
 * Accepts the shorter forms links may already be using and degrades one step at
 * a time: `set/variant/name`, then `set/name`, then a bare `name`. Anything that
 * still cannot be placed exactly falls back to the first set holding the name,
 * which is better than an empty sheet when a set or variant has been renamed.
 */
export function resolveIconParam(
  index: IconIndex,
  param: string,
): number | null {
  const parts = param.split('/');
  const name = parts[parts.length - 1];
  const slug = parts.length > 1 ? parts[0] : null;
  const variantId = parts.length > 2 ? parts.slice(1, -1).join('/') : null;

  let inSet: number | null = null;

  for (let i = 0; i < index.names.length; i++) {
    if (index.names[i] !== name) {
      continue;
    }

    const set = index.sets[index.setOf[i]];
    if (slug !== null && set.slug !== slug) {
      continue;
    }

    if (variantId === null) {
      return i;
    }

    if (set.variants[index.variantOf[i]].id === variantId) {
      return i;
    }

    // Right set, wrong variant: keep it in case the variant has been renamed.
    inSet ??= i;
  }

  if (inSet !== null) {
    return inSet;
  }

  const anywhere = index.names.indexOf(name);
  return anywhere === -1 ? null : anywhere;
}

export interface SearchQuery {
  /** The raw text as typed. */
  text: string;
  /** Slugs to search within, or null for every set. */
  sets: ReadonlySet<string> | null;
  /** Restrict to these names, used by the favourites tab. */
  only?: ReadonlySet<string>;
}

export interface SearchResult {
  positions: number[];
  /** The term a synonym redirected to, for the "Also matching" chip. */
  synonym: string | null;
  /** Whether the results came from the fuzzy fallback rather than a substring. */
  fuzzy: boolean;
}

/**
 * Substring first because it is fast and ranks exactly how people expect;
 * the caller supplies `fuzzy` for the fallback when nothing matched.
 */
export function searchIndex(
  index: IconIndex,
  query: SearchQuery,
  /**
   * Receives the scope, so it can rank only what is in scope rather than rank
   * everything and discard most of it. `scope` identifies the current selection
   * so a built index can be reused while it does not change.
   */
  fuzzy?: (
    term: string,
    included: (position: number) => boolean,
    scope: string,
  ) => number[],
): SearchResult {
  const text = query.text.trim().toLowerCase();
  const synonym = SYNONYMS[text] ?? null;
  const term = (synonym ?? text).replace(/[\s_-]+/g, '');
  const allowed = query.sets;
  const only = query.only;

  const included = (position: number) =>
    (!allowed || allowed.has(index.sets[index.setOf[position]].slug)) &&
    (!only || only.has(index.names[position]));

  const positions: number[] = [];
  for (let i = 0; i < index.lower.length; i++) {
    if ((!term || index.lower[i].includes(term)) && included(i)) {
      positions.push(i);
    }
  }

  if (positions.length > 0 || !term || !fuzzy) {
    return { positions, synonym, fuzzy: false };
  }

  return {
    // `included` is applied again so scope stays this function's guarantee
    // rather than every matcher's responsibility.
    positions: fuzzy(term, included, scopeKey(query)).filter(included),
    synonym,
    fuzzy: true,
  };
}

/**
 * A stable identity for a query's scope, so a matcher can cache per selection.
 *
 * Computed only on the fuzzy path, which is the one place it is needed.
 */
function scopeKey(query: SearchQuery): string {
  const sets = query.sets ? [...query.sets].sort().join(',') : '*';
  const only = query.only ? [...query.only].sort().join(',') : '*';
  return `${sets}|${only}`;
}

export interface IconGroup {
  set: IconSet;
  positions: number[];
  /** Variants actually present in these results, for the filter chips. */
  variants: IconVariant[];
}

/** Group results by set, preserving the index's set ordering. */
export function groupBySet(index: IconIndex, positions: number[]): IconGroup[] {
  const groups = new Map<number, IconGroup>();

  for (const position of positions) {
    const setIndex = index.setOf[position];
    let group = groups.get(setIndex);
    if (!group) {
      group = { set: index.sets[setIndex], positions: [], variants: [] };
      groups.set(setIndex, group);
    }
    group.positions.push(position);

    const variant = group.set.variants[index.variantOf[position]];
    if (!group.variants.includes(variant)) {
      group.variants.push(variant);
    }
  }

  // Sorted by set rather than by first appearance. A substring search yields
  // positions in index order, so the two agree, but the fuzzy fallback yields
  // them by score and the set groups jumped around between keystrokes.
  return [...groups.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, group]) => group);
}
