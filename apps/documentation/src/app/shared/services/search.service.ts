import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * Store the current search query
   */
  search$ = new BehaviorSubject<string>('');

  /** Debounce the search query */
  private didSearch$ = new Subject<string>();

  constructor() {
    this.didSearch$
      .pipe(debounceTime(500))
      .subscribe(query => this.search$.next(query));
  }

  search(query: string): void {
    this.didSearch$.next(query);
  }
}
