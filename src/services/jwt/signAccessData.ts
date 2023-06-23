import { JwtPayload } from 'jsonwebtoken';
import { messageError, ValueError } from '../../helpers';
import { sign } from './sign';

export const signAccessData = async (data: JwtPayload): Promise<ValueError<string>> => {
  if (process.env.JWT_SECRET === undefined) return [null, messageError('JWT secret not found')];

  const [encoded, err] = await sign({ ...data, type: 'access' }, process.env.JWT_SECRET, '30 days');

  if (err !== null) {
    return [null, err];
  }

  return [encoded, null];
};
