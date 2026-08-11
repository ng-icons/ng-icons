import Fuse from 'fuse.js';
import type { IconIndex } from './icon-index';

type Entry = { i: number; n: string };

/** Results returned, which is far more than a page ever renders. */
const LIMIT = 500;

/** Scoped indexes kept per icon index, so toggling sets back and forth is cheap. */
const CACHED_SCOPES = 4;

const FUSE_OPTIONS = {
  keys: ['n' as const],
  threshold: 0.3,
  ignoreLocation: true,
  shouldSort: true,
};

const caches = new WeakMap<IconIndex, Map<string, Fuse<Entry>>>();

/**
 * Typo-tolerant fallback for when a substring search finds nothing.
 *
 * The index is built over the icons in scope rather than over all 107k names,
 * which is what makes this both correct and affordable. Two earlier attempts
 * were neither:
 *
 * - Capping the global results at 500 before filtering to the selected sets
 *   meant a typo could return nothing when the best 500 matches happened to sit
 *   in sets the reader had not selected.
 * - Raising that cap did not fix the cost, because Fuse scores and sorts every
 *   match regardless of `limit`: measured against the real index, `limit: 500`,
 *   `limit: 5000` and no limit all took ~113ms on the main thread.
 *
 * Scoping instead removes both problems. For the four sets selected by default,
 * building the index costs ~5ms and the search ~25ms, and nothing in the index
 * is out of scope so no result can be filtered away after the fact.
 */
export function fuzzyMatcher(
  index: IconIndex,
): (
  term: string,
  included: (position: number) => boolean,
  scope: string,
) => number[] {
  return (term, included, scope) => {
    let byScope = caches.get(index);
    if (!byScope) {
      byScope = new Map();
      caches.set(index, byScope);
    }

    let fuse = byScope.get(scope);
    if (!fuse) {
      const entries: Entry[] = [];
      for (let i = 0; i < index.names.length; i++) {
        if (included(i)) {
          entries.push({ i, n: index.names[i] });
        }
      }

      fuse = new Fuse(entries, FUSE_OPTIONS);

      // Oldest out first. Selections change as sets are ticked, and an index per
      // combination would otherwise accumulate for the life of the page.
      if (byScope.size >= CACHED_SCOPES) {
        const oldest = byScope.keys().next().value;
        if (oldest !== undefined) {
          byScope.delete(oldest);
        }
      }
      byScope.set(scope, fuse);
    }

    return fuse.search(term, { limit: LIMIT }).map(result => result.item.i);
  };
}
