/**
 * Simple sorting accessor function for MatTableDataSource, which supports deep properties (dot notation) and
 * case insensitive sorting.
 *
 * Ripped from https://github.com/angular/components/issues/9205#issuecomment-387326580.
 */
import { readProperty } from '../internals/read-property.fn';

export function genericSortingAccessor<T>(data: T, sortHeaderId: string): string | number {
  const value = readProperty(data, sortHeaderId);

  if (typeof value === 'string') {
    return value.toLocaleLowerCase();
  }

  return value || '';
}
