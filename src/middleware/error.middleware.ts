import { ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../helpers';

const handleDbError = (err: ErrorResponse) => {
  // eslint-disable-next-line no-console
  console.error('DB Error', err.error);

  return {
    error: { message: 'Database error' },
    data: null,
  };
};

const handleDefaultError = (err: ErrorResponse) => {
  // eslint-disable-next-line no-console
  console.error('Default Error', err.error);

  return {
    error: { message: err.error.message },
    data: null,
  };
};

export const errorMiddleware: ErrorRequestHandler<
  unknown,
  { data: null; error: { message: string } | null },
  unknown,
  unknown
> = (errorData: ErrorResponse, req, res, next) => {
  switch (errorData.type) {
    case 'db':
      return res.status(500).json(handleDbError(errorData));
    case 'default':
      return res.status(400).json(handleDefaultError(errorData));
  }

  next();
};
