import { computed, signal } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { emptyState, planPage, resultSummary, sameSets } from './browse-paging';

describe('sameSets', () => {
  it('treats sets with the same members as equal', () => {
    expect(sameSets(new Set(['a', 'b']), new Set(['b', 'a']))).toBe(true);
    expect(sameSets(new Set(), new Set())).toBe(true);
  });

  it('treats different members or sizes as different', () => {
    expect(sameSets(new Set(['a']), new Set(['b']))).toBe(false);
    expect(sameSets(new Set(['a']), new Set(['a', 'b']))).toBe(false);
    expect(sameSets(new Set(['a', 'b']), new Set(['a']))).toBe(false);
  });
});

/**
 * The browse page derives its selected sets from the query string, so the
 * computed re-runs whenever *any* query param changes — including `icon` when
 * you click a result. With the default referential equality it then reported a
 * change, because each run builds a new Set, and everything downstream of it
 * re-ran: paging reset and most of the grid vanished mid-scroll.
 */
describe('selected sets derived from query params', () => {
  const selectedFrom = (
    params: ReturnType<typeof signal<{ sets: string; icon: string }>>,
    equal?: (a: ReadonlySet<string>, b: ReadonlySet<string>) => boolean,
  ) =>
    computed<ReadonlySet<string>>(() => new Set(params().sets.split(',')), {
      equal,
    });

  it('does not report a change when only an unrelated param moves', () => {
    const params = signal({ sets: 'lucide,heroicons', icon: 'lucideHammer' });
    const selected = selectedFrom(params, sameSets);

    const before = selected();
    params.set({ sets: 'lucide,heroicons', icon: 'lucideAnchor' });

    expect(selected()).toBe(before);
  });

  it('still reports a change when the sets themselves change', () => {
    const params = signal({ sets: 'lucide', icon: '' });
    const selected = selectedFrom(params, sameSets);

    const before = selected();
    params.set({ sets: 'lucide,heroicons', icon: '' });

    expect(selected()).not.toBe(before);
    expect([...selected()]).toEqual(['lucide', 'heroicons']);
  });

  it('re-emits without the custom equality, which is the bug being guarded', () => {
    const params = signal({ sets: 'lucide', icon: 'a' });
    const selected = selectedFrom(params);

    const before = selected();
    params.set({ sets: 'lucide', icon: 'b' });

    expect(selected()).not.toBe(before);
  });
});

describe('planPage', () => {
  const MIN = 60;

  it('gives a single set the whole page', () => {
    expect(planPage(240, 1, MIN)).toEqual({ perGroup: 240, groupsShown: 1 });
  });

  it('splits the page evenly while every set still clears the minimum', () => {
    expect(planPage(240, 4, MIN)).toEqual({ perGroup: 60, groupsShown: 4 });
    expect(planPage(240, 2, MIN)).toEqual({ perGroup: 120, groupsShown: 2 });
  });

  /**
   * With all 40 sets selected, dividing the page between them left six icons
   * each and looked as though the results had been filtered away.
   */
  it('shows fewer sets rather than starving each one', () => {
    expect(planPage(240, 40, MIN)).toEqual({ perGroup: 60, groupsShown: 4 });
    expect(planPage(480, 40, MIN)).toEqual({ perGroup: 60, groupsShown: 8 });
  });

  it('reveals more sets as the page grows', () => {
    const shown = [240, 480, 720].map(
      limit => planPage(limit, 40, MIN).groupsShown,
    );

    expect(shown).toEqual([4, 8, 12]);
  });

  it('always shows at least one set', () => {
    expect(planPage(10, 40, MIN)).toEqual({ perGroup: 60, groupsShown: 1 });
    expect(planPage(240, 0, MIN)).toEqual({ perGroup: 60, groupsShown: 1 });
  });
});

describe('resultSummary', () => {
  const LIBRARY = 107705;
  const state = {
    ready: true,
    tab: 'all' as const,
    favourites: 0,
    matching: 382,
    library: LIBRARY,
    sets: 3,
  };

  /**
   * The count describes what the filters select out of the whole library. It
   * used to be "rendered of pool", which meant the first number tracked how far
   * you had scrolled and the second ignored the search entirely.
   */
  it('counts what the filters select, against the whole library', () => {
    expect(resultSummary({ ...state, matching: 7268, sets: 1 })).toBe(
      'Showing 7,268 of 107,705 icons in 1 set',
    );
  });

  it('narrows the first number as a query is typed, keeping the library fixed', () => {
    expect(resultSummary(state)).toBe('Showing 382 of 107,705 icons in 3 sets');
    expect(resultSummary({ ...state, matching: 14 })).toBe(
      'Showing 14 of 107,705 icons in 3 sets',
    );
  });

  it('drops the comparison when everything is selected', () => {
    expect(resultSummary({ ...state, matching: LIBRARY, sets: 40 })).toBe(
      '107,705 icons in 40 sets',
    );
  });

  it('reports nothing matching without a misleading zero', () => {
    expect(resultSummary({ ...state, matching: 0 })).toBe('No icons in 3 sets');
  });

  it('uses the singular for a single set', () => {
    expect(resultSummary({ ...state, matching: 1, sets: 1 })).toBe(
      'Showing 1 of 107,705 icons in 1 set',
    );
  });

  it('counts favourites on the favourites tab', () => {
    expect(
      resultSummary({
        ...state,
        tab: 'favourites',
        favourites: 7,
        matching: 7,
      }),
    ).toBe('7 favourites');
    expect(
      resultSummary({
        ...state,
        tab: 'favourites',
        favourites: 1,
        matching: 1,
      }),
    ).toBe('1 favourite');
  });

  /** A query narrows the favourites, so the total stops describing the grid. */
  it('counts matching favourites once a query narrows them', () => {
    expect(
      resultSummary({
        ...state,
        tab: 'favourites',
        favourites: 12,
        matching: 3,
      }),
    ).toBe('Showing 3 of 12 favourites');
  });

  it('says nothing until the index has loaded', () => {
    expect(resultSummary({ ...state, ready: false })).toBe('');
  });
});

describe('emptyState', () => {
  const totalSets = 40;

  /**
   * With no sets ticked nothing can match whatever you type, so the suggestion
   * chips were dead controls and the copy still blamed "your selected sets".
   */
  it('names the real cause when no sets are selected', () => {
    expect(emptyState({ sets: 0, query: '', totalSets })).toEqual({
      title: 'No icon sets selected',
      body: 'Choose a set from the filters, or search the whole library.',
      showSuggestions: false,
      action: 'Select all 40 sets',
      keepsQuery: true,
    });
  });

  /**
   * The button says "Select all N sets", so it should do that and nothing else.
   * It shared a handler with "Search all N sets", which also clears the query,
   * so clicking it threw away what the reader had typed.
   */
  it('marks the select-all action as one that keeps the query', () => {
    expect(emptyState({ sets: 0, query: 'heart', totalSets }).keepsQuery).toBe(
      true,
    );
    expect(emptyState({ sets: 3, query: 'heart', totalSets }).keepsQuery).toBe(
      undefined,
    );
  });

  it('keeps naming that cause even once something has been typed', () => {
    expect(emptyState({ sets: 0, query: 'zoom', totalSets }).title).toBe(
      'No icon sets selected',
    );
    expect(
      emptyState({ sets: 0, query: 'zoom', totalSets }).showSuggestions,
    ).toBe(false);
  });

  it('offers suggestions when sets are selected but the query matched nothing', () => {
    expect(emptyState({ sets: 3, query: 'zoom', totalSets })).toEqual({
      title: 'No matches for “zoom”',
      body: 'Nothing in your selected sets matches. Try one of these, or search all 40 sets.',
      showSuggestions: true,
      action: 'Search all 40 sets',
    });
  });

  it('handles selected sets with no query at all', () => {
    expect(emptyState({ sets: 3, query: '', totalSets }).title).toBe(
      'No matches',
    );
  });

  /**
   * An empty favourites tab was described as a search miss, so it offered
   * suggestions and a "search all sets" button, neither of which puts anything
   * in the list.
   */
  describe('on the favourites tab', () => {
    it('explains how to add one when there are none', () => {
      const empty = emptyState({
        sets: 3,
        query: '',
        totalSets,
        tab: 'favourites',
        favourites: 0,
      });

      expect(empty.title).toBe('No favourites yet');
      expect(empty.body).toContain('heart');
      expect(empty.showSuggestions).toBe(false);
      expect(empty.action).toBeUndefined();
    });

    it('says the filters excluded them when some are saved', () => {
      const empty = emptyState({
        sets: 3,
        query: 'zoom',
        totalSets,
        tab: 'favourites',
        favourites: 12,
      });

      expect(empty.title).toBe('No favourites match \u201Czoom\u201D');
      expect(empty.showSuggestions).toBe(false);
      expect(empty.action).toBeUndefined();
    });

    it('never offers to widen the set selection, which cannot help', () => {
      for (const favourites of [0, 5]) {
        const empty = emptyState({
          sets: 0,
          query: 'x',
          totalSets,
          tab: 'favourites',
          favourites,
        });

        expect(empty.action, `favourites: ${favourites}`).toBeUndefined();
      }
    });
  });
});
