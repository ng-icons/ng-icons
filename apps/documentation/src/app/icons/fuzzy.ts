import Fuse from 'fuse.js';
import type { IconIndex } from './icon-index';

const cache = new WeakMap<IconIndex, Fuse<{ i: number; n: string }>>();

/** Results kept after scoping, which is far more than a page ever renders. */
const LIMIT = 500;

/**
 * Typo-tolerant fallback for when a substring search finds nothing.
 *
 * The cap is applied after `included`, not before. Capping the raw Fuse results
 * first meant that if the best 500 matches across all 107k names happened to sit
 * in sets the reader had not selected, a typo returned nothing at all even though
 * their own sets contained matches.
 *
 * ponytail: the Fuse index covers every name and is built on first use, which
 * costs a beat the first time someone mistypes. If that ever shows, restrict it
 * to the selected sets and rebuild on selection change.
 */
export function fuzzyMatcher(
  index: IconIndex,
): (term: string, included: (position: number) => boolean) => number[] {
  return (term, included) => {
    let fuse = cache.get(index);
    if (!fuse) {
      fuse = new Fuse(
        index.names.map((n, i) => ({ i, n })),
        { keys: ['n'], threshold: 0.3, ignoreLocation: true, shouldSort: true },
      );
      cache.set(index, fuse);
    }

    const matches: number[] = [];
    for (const result of fuse.search(term)) {
      if (included(result.item.i)) {
        matches.push(result.item.i);
        if (matches.length >= LIMIT) {
          break;
        }
      }
    }
    return matches;
  };
}
