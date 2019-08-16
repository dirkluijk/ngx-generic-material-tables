import { MatTableDataSource } from '@angular/material';

import { createGenericFilterPredicate } from '../filtering/generic-filter-predicate.fn';
import { genericSortingAccessor } from '../sorting/generic-sorting-accessor.fn';

/**
 * A MatTableDataSource which has generic sorting and filtering behaviour. It assumes the column names to match the data
 * properties, with support for dot notation.
 */
export class GenericTableDataSource<T> extends MatTableDataSource<T> {
    constructor(filterColumns: Iterable<string>, initialData?: T[]) {
        super(initialData);

        this.sortingDataAccessor = genericSortingAccessor;
        this.filterPredicate = createGenericFilterPredicate(filterColumns);
    }
}
