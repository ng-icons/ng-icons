import Fuse from 'fuse.js';
import type { IconIndex } from './icon-index';

const cache = new WeakMap<IconIndex, Fuse<{ i: number; n: string }>>();

/**
 * Typo-tolerant fallback for when a substring search finds nothing.
 *
 * ponytail: the Fuse index covers every name and is built on first use, which
 * costs a beat the first time someone mistypes. If that ever shows, restrict it
 * to the selected sets and rebuild on selection change.
 */
export function fuzzyMatcher(index: IconIndex): (term: string) => number[] {
  return term => {
    let fuse = cache.get(index);
    if (!fuse) {
      fuse = new Fuse(
        index.names.map((n, i) => ({ i, n })),
        { keys: ['n'], threshold: 0.3, ignoreLocation: true, shouldSort: true },
      );
      cache.set(index, fuse);
    }
    return fuse.search(term, { limit: 500 }).map(result => result.item.i);
  };
}
