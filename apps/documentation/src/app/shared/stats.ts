import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { iconStats } from 'virtual:icon-stats';
import { compact, lifetimeWindows } from './downloads';

/** Icon and set counts, and the published version, measured at build time. */
export const ICON_STATS = iconStats;

/**
 * Stars and downloads. Fetched in the browser so they stay current between
 * deploys; the prerendered HTML ships the figures below rather than an empty
 * space, and a failed request simply leaves those in place.
 *
 * They are placeholders, not a record to maintain: every one of them is
 * replaced on load. Left to be bumped by hand, the all-time total sat at 4.0M
 * while the real figure passed 5M.
 */
@Injectable({ providedIn: 'root' })
export class Stats {
  private readonly http = inject(HttpClient);

  readonly stars = signal('586');
  readonly weekly = signal('108K');
  readonly lifetime = signal('5.0M');

  private loaded = false;

  load(): void {
    if (this.loaded) {
      return;
    }
    this.loaded = true;

    this.http
      .get<{
        stargazers_count: number;
      }>('https://api.github.com/repos/ng-icons/ng-icons')
      .subscribe({
        next: repo => this.stars.set(compact(repo.stargazers_count)),
        error: () => undefined,
      });

    this.downloads('last-week').subscribe({
      next: point => this.weekly.set(compact(point.downloads)),
      error: () => undefined,
    });

    // One request per 18-month window, summed: four today, five from 2027.
    forkJoin(lifetimeWindows().map(window => this.downloads(window))).subscribe(
      {
        next: points =>
          this.lifetime.set(
            compact(
              points.reduce((total, point) => total + point.downloads, 0),
            ),
          ),
        error: () => undefined,
      },
    );
  }

  private downloads(period: string) {
    return this.http.get<{ downloads: number }>(
      `https://api.npmjs.org/downloads/point/${period}/@ng-icons/core`,
    );
  }
}
