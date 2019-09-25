import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { completed, next, observable, record } from '@dirkluijk/observable-matchers';

import { mapToLoadable } from './map-to-loadable.operator';
import { Loadable, loading, success, failed } from './loadable';

describe('MapToLoadable operator', () => {
  it('should be loading initially', fakeAsync(() => {
    const foo$ = of('foo').pipe(
      delay(1000),
      mapToLoadable()
    );

    expect(foo$).toEqual(observable(
      next(loading())
    ));

    discardPeriodicTasks();
  }));

  it('should be success on emit', fakeAsync(() => {
    const foo$ = of('foo').pipe(
      delay(1000),
      mapToLoadable()
    );

    const recorded$ = record(foo$);

    tick(1000);

    expect(recorded$).toEqual(observable<Loadable<string>>(
      next(loading()),
      next(success('foo')),
      completed()
    ));
  }));

  it('should be failed on emit', fakeAsync(() => {
    const foo$ = throwError('error').pipe(
      delay(1000),
      mapToLoadable()
    );

    const recorded$ = record(foo$);

    tick(1000);

    expect(recorded$).toEqual(observable<Loadable<string>>(
      next(loading()),
      next(failed('error')),
      completed()
    ));
  }));
});
