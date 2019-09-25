import { MatTableDataSource } from '@angular/material';

import { createGenericFilterPredicate } from '../filtering/generic-filter-predicate.fn';
import { genericSortingAccessor } from '../sorting/generic-sorting-accessor.fn';
import { ColumnFilterPredicate } from '../filtering/column-filter-predicate';
import { defaultColumnFilterPredicate } from '../filtering/default-column-filter-predicate';

/**
 * A MatTableDataSource which has generic sorting and filtering behaviour. It assumes the column names to match the data
 * properties, with support for dot notation.
 */
export class GenericTableDataSource<T> extends MatTableDataSource<T> {
  public set columnFilterPredicate(columnPredicate: ColumnFilterPredicate) {
    this._columnPredicate = columnPredicate;
    this.updateFilterPredicate();
  }

  public set filterColumns(columns: Iterable<string>) {
    this._filterColumns = columns;
    this.updateFilterPredicate();
  }

  private _filterColumns: Iterable<string> = [];
  private _columnPredicate: ColumnFilterPredicate = defaultColumnFilterPredicate;

  constructor(filterColumns: Iterable<string>, initialData?: T[]) {
    super(initialData);

    this.sortingDataAccessor = genericSortingAccessor;
    this.filterColumns = filterColumns;
  }

  private updateFilterPredicate(): void {
    this.filterPredicate = createGenericFilterPredicate(this._filterColumns, this._columnPredicate);
  }
}
