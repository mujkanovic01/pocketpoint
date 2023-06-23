import { messageError, ValueError } from '../../helpers';
import { AccessJWTPayload } from './types';
import { verify } from './verify';

export const verifyAccessToken = async (token: string): Promise<ValueError<AccessJWTPayload>> => {
  if (process.env.JWT_SECRET === undefined) return [null, messageError('JWT secret not found')];

  const [decoded, err] = await verify(token, process.env.JWT_SECRET);

  if (err !== null) {
    return [null, err];
  }

  if (decoded?.type === 'access') {
    return [decoded as AccessJWTPayload, null];
  } else {
    return [null, messageError('Invalid token type')];
  }
};