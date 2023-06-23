import jwt, { VerifyErrors } from 'jsonwebtoken';
import { defaultError, handlePromise, ValueError } from '../../helpers';
import { BaseJWTPayload } from './types';

export const verify = async (token: string, secret: string): Promise<ValueError<BaseJWTPayload>> => {
  const [result, err] = await handlePromise<BaseJWTPayload, VerifyErrors>(
    new Promise<BaseJWTPayload>((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err !== null) reject(err);

        if (typeof decoded !== 'string' && decoded != null) resolve(decoded as BaseJWTPayload);

        reject(Error('Unexpected jwt error'));
      });
    }),
  );

  if (err !== null) {
    return [null, defaultError(err)];
  }

  return [result, null];
};
