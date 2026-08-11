import { effect, signal, type WritableSignal } from '@angular/core';

/**
 * A signal backed by localStorage. Falls back to memory only when storage is
 * unavailable (private browsing, or during prerendering) so callers never
 * have to care which it is.
 */
export function storedSignal<T>(key: string, fallback: T): WritableSignal<T> {
  const state = signal<T>(read(key) ?? fallback);

  effect(() => {
    const value = state();
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable, keep the in-memory value */
    }
  });

  return state;
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}
