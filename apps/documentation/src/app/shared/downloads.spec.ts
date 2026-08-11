import { describe, expect, it } from 'vitest';
import { compact, lifetimeWindows } from './downloads';

describe('compact', () => {
  it('formats each magnitude', () => {
    expect(compact(586)).toBe('586');
    expect(compact(104312)).toBe('104K');
    expect(compact(4012345)).toBe('4.0M');
    expect(compact(0)).toBe('0');
    expect(compact(999)).toBe('999');
    expect(compact(1000)).toBe('1K');
  });

  /** Rounding up through the boundary used to read as "1000K". */
  it('crosses into millions rather than printing 1000K', () => {
    expect(compact(999_499)).toBe('999K');
    expect(compact(999_500)).toBe('1.0M');
    expect(compact(999_999)).toBe('1.0M');
    expect(compact(1_000_000)).toBe('1.0M');
  });
});

/**
 * npm answers at most 18 months per request, so the all-time total is stitched
 * from several. A gap or an overlap between windows would silently mis-state
 * the figure rather than fail, so the boundaries are worth pinning down.
 */
describe('lifetimeWindows', () => {
  const at = (day: string) => new Date(`${day}T12:00:00Z`);

  it('covers the whole span with no gap and no overlap', () => {
    const windows = lifetimeWindows(at('2026-08-11'));
    const bounds = windows.map(window => window.split(':'));

    expect(bounds[0][0]).toBe('2021-08-31');
    expect(bounds[bounds.length - 1][1]).toBe('2026-08-11');

    for (let i = 1; i < bounds.length; i++) {
      const previousEnd = Date.parse(`${bounds[i - 1][1]}T00:00:00Z`);
      const start = Date.parse(`${bounds[i][0]}T00:00:00Z`);

      expect(start - previousEnd).toBe(24 * 60 * 60 * 1000);
    }
  });

  it('keeps every window inside npm’s 18-month limit', () => {
    for (const window of lifetimeWindows(at('2026-08-11'))) {
      const [start, end] = window
        .split(':')
        .map(day => Date.parse(`${day}T00:00:00Z`));

      expect((end - start) / (24 * 60 * 60 * 1000)).toBeLessThanOrEqual(540);
    }
  });

  it('needs four windows today and grows over time', () => {
    expect(lifetimeWindows(at('2026-08-11'))).toHaveLength(4);
    expect(lifetimeWindows(at('2030-01-01')).length).toBeGreaterThan(4);
  });

  /** The very first day the package existed still has to be asked about. */
  it('asks for a single day when run on release day', () => {
    expect(lifetimeWindows(at('2021-08-31'))).toEqual([
      '2021-08-31:2021-08-31',
    ]);
  });

  it('does not run past today', () => {
    const windows = lifetimeWindows(at('2022-01-15'));

    expect(windows).toEqual(['2021-08-31:2022-01-15']);
  });
});
