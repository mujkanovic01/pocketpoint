import { ErrorResponse } from './errors';

export type ValueError<V, E = ErrorResponse> = [V | null, E | null];

export async function handlePromise<V, E extends Error>(promise: Promise<V>): Promise<ValueError<V, E>> {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error];
  }
}
