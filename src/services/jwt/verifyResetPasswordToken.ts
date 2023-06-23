import { messageError, ValueError } from '../../helpers';
import { ResetPasswordJWTPayload } from './types';
import { verify } from './verify';

export const verifyResetPasswordToken = async (token: string): Promise<ValueError<ResetPasswordJWTPayload>> => {
  if (process.env.JWT_SECRET === undefined) return [null, messageError('JWT secret not found')];

  const [decoded, err] = await verify(token, process.env.JWT_SECRET);

  if (err !== null) {
    return [null, err];
  }

  if (decoded?.type === 'reset') {
    return [decoded as ResetPasswordJWTPayload, null];
  } else {
    return [null, messageError('Invalid token type')];
  }
};
