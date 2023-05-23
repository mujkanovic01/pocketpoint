export type ErrorResponse = {
  error: Error;
  data: null;
  type: 'default' | 'db';
};

export const messageError = (message: string): ErrorResponse => ({
  error: Error(message),
  data: null,
  type: 'default',
});

export const dbError = (error: Error | null): ErrorResponse => ({
  error: error ?? Error('Unknown error'),
  data: null,
  type: 'db',
});

export const defaultError = (error: Error | null): ErrorResponse => ({
  error: error ?? Error('Unknown error'),
  data: null,
  type: 'default',
});

export const unexpectedError = (): ErrorResponse => ({
  error: Error('Unexpected error'),
  data: null,
  type: 'default',
});
