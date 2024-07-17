import { Observable, isObservable } from 'rxjs';

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
    // toPromise is deprecated, but we can't use lastValueFrom because it's not available in RxJS 6
    // so for now we'll just use toPromise
    return result.toPromise() as Promise<string>;
  }

  return result;
}
