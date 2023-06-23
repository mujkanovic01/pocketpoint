import jwt, { VerifyErrors } from 'jsonwebtoken';
import { defaultError, handlePromise, ValueError } from '../../helpers';
import { BaseJWTPayload } from './types';

export const sign = async (
  data: BaseJWTPayload,
  secret: string,
  expiresIn: string | number | undefined,
): Promise<ValueError<string>> => {
  const [result, err] = await handlePromise<string, VerifyErrors>(
    new Promise<string>((resolve, reject) => {
      jwt.sign(data, secret, { expiresIn }, (err, encoded) => {
        if (err !== null) reject(err);

        if (encoded != null) resolve(encoded);

        reject(Error('Unexpected jwt error'));
      });
    }),
  );

  if (err !== null) {
    return [null, defaultError(err)];
  }

  return [result, null];
};
