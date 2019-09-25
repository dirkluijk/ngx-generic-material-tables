import { ColumnFilterPredicate } from './column-filter-predicate';

/**
 * A default filter predicate function for columns in a data source.
 */
export const defaultColumnFilterPredicate: ColumnFilterPredicate = (value: any, filter: string): boolean => {
  return value !== undefined && String(value).trim().toLocaleLowerCase().includes(filter.toLocaleLowerCase());
};
