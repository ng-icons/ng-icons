import { Observable, firstValueFrom, isObservable } from 'rxjs';

/**
 * A loader may return a promise, an observable or a string. This function will coerce the result into a promise.
 * @returns
 */
export function coerceLoaderResult(
  result: Promise<string> | Observable<string> | string,
): Promise<string> {
  if (typeof result === 'string') {
    return Promise.resolve(result);
  }

  if (isObservable(result)) {
    return firstValueFrom(result);
  }

  return result;
}
