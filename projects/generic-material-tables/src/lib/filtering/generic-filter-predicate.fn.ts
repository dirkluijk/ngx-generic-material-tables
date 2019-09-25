/**
 * Creates a filter predicate function for a MatTableDataSource, which supports deep properties (dot notation) and
 * only filters on the displayed columns.
 */
import { readProperty } from '../internals/read-property.fn';

export function createGenericFilterPredicate<T>(columns: Iterable<string>): ((data: T, filter: string) => boolean) {
  return (data: T, filter: string): boolean => {
    return Array.from(columns).some((column) => {
      const value = readProperty(data, column);

      return value !== undefined && String(value).trim().toLocaleLowerCase().includes(filter.toLowerCase());
    });
  };
}
