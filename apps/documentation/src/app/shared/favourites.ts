import { computed, Injectable } from '@angular/core';
import { storedSignal } from './local-storage';

/** Favourited icons, by constant name, kept in localStorage. */
@Injectable({ providedIn: 'root' })
export class Favourites {
  private readonly state = storedSignal<string[]>('ng-icons-favourites', []);

  readonly names = computed(() => new Set(this.state()));
  readonly count = computed(() => this.state().length);

  has(name: string): boolean {
    return this.names().has(name);
  }

  toggle(name: string): void {
    this.state.update(names =>
      names.includes(name)
        ? names.filter(existing => existing !== name)
        : [...names, name],
    );
  }
}
