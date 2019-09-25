/**
 * Simple accessor function which can be used to retrieve properties from a record using a dot notation.
 */
export function readProperty(object: { [key: string]: any }, path: string): any | undefined {
  try {
    return path.split('.').reduce((a, b) => a[b], object);
  } catch {
    return undefined;
  }
}
