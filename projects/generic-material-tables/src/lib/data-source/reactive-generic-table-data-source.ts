import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { createGenericFilterPredicate } from '../filtering/generic-filter-predicate.fn';

import { GenericTableDataSource } from './generic-table-data-source';

/**
 * A reactive version of GenericTableDataSource, for which a stream of data can be passed.
 */
export class ReactiveGenericTableDataSource<T> extends GenericTableDataSource<T> {
    private readonly subscription = new Subscription();

    constructor(
        private readonly filterColumns$: Observable<Iterable<string>>,
        private readonly data$: Observable<T[]>,
        private readonly filter$?: Observable<string>
    ) {
        super([], []);
    }

    public connect(): BehaviorSubject<T[]> {
        this.subscription.add(this.data$.subscribe((data) => this.data = data));
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
}
