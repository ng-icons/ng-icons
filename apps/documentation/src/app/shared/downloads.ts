/**
 * The arithmetic behind the download figures, kept free of Angular so it can be
 * tested directly: importing anything that pulls in `HttpClient` needs the JIT
 * compiler, which the unit tests do not load.
 */

/** The first `@ng-icons/core` release, where the all-time total starts. */
const FIRST_RELEASE = '2021-08-31';

/** npm serves at most 18 months of downloads per request. */
const WINDOW_DAYS = 540;

const DAY = 24 * 60 * 60 * 1000;

/** 586 -> "586", 104312 -> "104K", 4012345 -> "4.0M" */
export function compact(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = Math.round(value / 1_000);
    // 999,500 rounds to 1000, and "1000K" reads like a mistake.
    return thousands >= 1_000 ? '1.0M' : `${thousands}K`;
  }
  return String(value);
}

/**
 * The periods to ask npm for, covering release day to today.
 *
 * `2021-08-31:2023-02-22`, `2023-02-23:2024-08-16`, … Each window ends the day
 * before the next begins, so summing the results neither double-counts a day
 * nor skips one.
 */
export function lifetimeWindows(
  today: Date = new Date(),
  firstRelease: string = FIRST_RELEASE,
): string[] {
  const last = Date.parse(`${iso(today.getTime())}T00:00:00Z`);
  const windows: string[] = [];

  for (
    let start = Date.parse(`${firstRelease}T00:00:00Z`);
    start <= last;
    start += (WINDOW_DAYS + 1) * DAY
  ) {
    windows.push(
      `${iso(start)}:${iso(Math.min(start + WINDOW_DAYS * DAY, last))}`,
    );
  }

  return windows;
}

const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
