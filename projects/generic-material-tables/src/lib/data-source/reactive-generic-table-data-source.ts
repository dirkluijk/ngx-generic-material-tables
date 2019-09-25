import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { createGenericFilterPredicate } from '../filtering/generic-filter-predicate.fn';
import { mapToLoadable } from '../internals/loading/map-to-loadable.operator';
import { Loadable } from '../internals/loading/loadable';

import { GenericTableDataSource } from './generic-table-data-source';

/**
 * A reactive version of GenericTableDataSource, for which a stream of data can be passed.
 */
export class ReactiveGenericTableDataSource<T> extends GenericTableDataSource<T> {
  public loading = false;
  public success = false;
  public failed = false;

  public readonly loading$: Observable<boolean>;
  public readonly success$: Observable<boolean>;
  public readonly failed$: Observable<boolean>;

  public error?: Error;

  private readonly subscription = new Subscription();
  private readonly reloadSubject = new BehaviorSubject<void>(undefined);
  private readonly loadableData$: Observable<Loadable<T[]>>;

  constructor(
    private readonly filterColumns$: Observable<Iterable<string>>,
    private readonly data$: Observable<T[]>,
    private readonly filter$?: Observable<string>
  ) {
    super([], []);

    this.loadableData$ = this.reloadSubject.pipe(
      switchMap(() => this.data$.pipe(mapToLoadable())),
      shareReplay()
    );

    this.loading$ = this.loadableData$.pipe(map((l) => l.loading));
    this.success$ = this.loadableData$.pipe(map((l) => l.success));
    this.failed$ = this.loadableData$.pipe(map((l) => l.failed));
  }

  public connect(): BehaviorSubject<T[]> {
    this.subscription.add(
      this.loadableData$.subscribe((loadable) => {
        this.loading = loadable.loading;
        this.success = loadable.success;
        this.failed = loadable.failed;

        if (loadable.failed) {
          this.error = loadable.error;
          this.data = [];
        } else if (loadable.success) {
          this.error = undefined;
          this.data = loadable.value;
        }
      }));

    this.subscription.add(this.filterColumns$.subscribe((columns) => this.filterPredicate = createGenericFilterPredicate(columns)));

    if (this.filter$) {
      this.subscription.add(this.filter$.subscribe((filter) => this.filter = filter));
    }

    return super.connect();
  }

  public disconnect(): void {
    super.disconnect();

    this.subscription.unsubscribe();
  }

  public reload(): void {
    this.reloadSubject.next();
  }
}
