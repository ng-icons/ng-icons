/**
 * Pure helpers behind the browse page's result paging.
 *
 * Kept out of the component so the rules can be tested directly: both of these
 * have produced visible bugs in the grid.
 */

/**
 * Compares selected-set collections by their members.
 *
 * The selection is derived from the query string, so it is rebuilt whenever any
 * param changes — including `icon` when a result is clicked. Under the default
 * referential equality a rebuilt Set counts as a change and everything
 * downstream re-runs, which reset the paging and made most of the grid
 * disappear. Pass this as a computed's `equal` to keep the identity stable.
 */
export function sameSets(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): boolean {
  if (a === b) {
    return true;
  }
  if (a.size !== b.size) {
    return false;
  }
  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }
  return true;
}

export interface PagePlan {
  /** Icons to show per set. */
  perGroup: number;
  /** Sets to show at all. */
  groupsShown: number;
}

/**
 * Divides a page of results between the sets that matched.
 *
 * Every set shown gets at least `minPerGroup` icons and the page shows only as
 * many sets as that allows, so scrolling reveals more sets rather than trimming
 * each one. Splitting the page evenly across 40 selected sets left six icons
 * each, which read as though the results had been filtered away. It also bounds
 * the SVG data fetched, since only the sets on screen are loaded.
 */
export function planPage(
  limit: number,
  groupCount: number,
  minPerGroup: number,
): PagePlan {
  if (groupCount <= 0) {
    return { perGroup: minPerGroup, groupsShown: 1 };
  }
  const perGroup = Math.max(minPerGroup, Math.ceil(limit / groupCount));
  return {
    perGroup,
    groupsShown: Math.max(1, Math.floor(limit / perGroup)),
  };
}

export interface ResultState {
  /** False until the icon index has downloaded. */
  ready: boolean;
  tab: 'all' | 'favourites';
  favourites: number;
  /** Icons matching the query, the selected sets and the variant chips. */
  matching: number;
  /** Every icon in the library, as the figure to compare against. */
  library: number;
  sets: number;
}

const plural = (count: number, word: string) =>
  `${count.toLocaleString('en-GB')} ${word}${count === 1 ? '' : 's'}`;

/**
 * The line above the grid: what the current filters select, out of the library.
 *
 * Deliberately says nothing about how many icons are rendered. That number is
 * an artefact of the infinite scroll, and putting it first made the line look
 * like a match count that crept upwards as you scrolled.
 */
export function resultSummary({
  ready,
  tab,
  favourites,
  matching,
  library,
  sets,
}: ResultState): string {
  if (!ready) {
    return '';
  }
  if (tab === 'favourites') {
    return plural(favourites, 'favourite');
  }

  const scope = `in ${plural(sets, 'set')}`;
  if (matching === 0) {
    return `No icons ${scope}`;
  }
  // Nothing is filtered out, so there is nothing to compare against.
  if (matching >= library) {
    return `${plural(matching, 'icon')} ${scope}`;
  }
  return `Showing ${matching.toLocaleString('en-GB')} of ${plural(library, 'icon')} ${scope}`;
}

export interface EmptyStateInput {
  /** Icon sets currently ticked. */
  sets: number;
  query: string;
  totalSets: number;
}

export interface EmptyStateCopy {
  title: string;
  body: string;
  /** Suggested searches only help when there is somewhere to search. */
  showSuggestions: boolean;
  action: string;
}

/**
 * The copy for an empty grid, chosen by why it is empty.
 *
 * With no sets ticked nothing can match, so the suggestion chips do nothing
 * when clicked and the "your selected sets" wording is untrue. That case gets
 * its own message and a single action that fixes it.
 */
export function emptyState({
  sets,
  query,
  totalSets,
}: EmptyStateInput): EmptyStateCopy {
  if (sets === 0) {
    return {
      title: 'No icon sets selected',
      body: 'Choose a set from the filters, or search the whole library.',
      showSuggestions: false,
      action: `Select all ${totalSets} sets`,
    };
  }
  return {
    title: query ? `No matches for “${query}”` : 'No matches',
    body: `Nothing in your selected sets matches. Try one of these, or search all ${totalSets} sets.`,
    showSuggestions: true,
    action: `Search all ${totalSets} sets`,
  };
}
