import { concat, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { failed, Loadable, LOADING, success } from './loadable';

export function mapToLoadable<T, E = any>(): OperatorFunction<T, Loadable<T, E>> {
  return (source$: Observable<T>) => concat<Loadable<T, E>>(
    of(LOADING),
    source$.pipe(
      map((value) => success(value)),
      catchError((error: E) => of(failed(error)))
    )
  );
}
