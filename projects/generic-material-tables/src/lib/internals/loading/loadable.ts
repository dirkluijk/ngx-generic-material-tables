export interface Loading {
  loading: true;
  failed: false;
  success: false;
}

export interface Failed<E> {
  loading: false;
  failed: true;
  success: false;
  error: E;
}

export interface Success<T> {
  loading: false;
  failed: false;
  success: true;
  value: T;
}

export type Loadable<T, E = any> = Readonly<(Loading | Failed<E> | Success<T>)>;

export function loading(): Loading {
  return { loading: true, failed: false, success: false };
}

export function success<T>(value: T): Success<T> {
  return { loading: false, failed: false, success: true, value };
}

export function failed<E>(error: E): Failed<E> {
  return { loading: false, failed: true, success: false, error };
}

export const LOADING = loading();
