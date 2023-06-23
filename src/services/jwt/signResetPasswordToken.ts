import { JwtPayload } from 'jsonwebtoken';
import { messageError, ValueError } from '../../helpers';
import { sign } from './sign';

export const signResetPasswordToken = async (data: JwtPayload): Promise<ValueError<string>> => {
  if (process.env.JWT_SECRET === undefined) return [null, messageError('JWT secret not found')];

  const [encoded, err] = await sign({ ...data, type: 'reset' }, process.env.JWT_SECRET, '24h');

  if (err !== null) {
    return [null, err];
  }

  return [encoded, null];
};
