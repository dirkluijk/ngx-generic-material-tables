/**
 * Creates a filter predicate function for a MatTableDataSource, which supports deep properties (dot notation) and
 * only filters on the displayed columns.
 */
import { readProperty } from '../internals/read-property.fn';

import { defaultColumnFilterPredicate } from './default-column-filter-predicate';
import { DataSourceFilterPredicate } from './data-source-filter-predicate';
import { ColumnFilterPredicate } from './column-filter-predicate';

export function createGenericFilterPredicate<T>(
  columns: Iterable<string>,
  filterColumn: ColumnFilterPredicate = defaultColumnFilterPredicate
): DataSourceFilterPredicate<T> {
  return (data: T, filter: string): boolean => {
    return Array.from(columns).some((columnName) => {
      const value = readProperty(data, columnName);

      return filterColumn(value, filter, columnName);
    });
  };
}
