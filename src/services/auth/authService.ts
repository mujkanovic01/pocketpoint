import { User, UserInsertData, USER_COLUMNS, USER_TABLE } from '../../models';
import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
import { config } from 'dotenv';
// import sendgrid from '@sendgrid/mail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { JWTService } from '..';

config();

export const register = async (userData: UserInsertData): Promise<ValueError<number[]>> => {
  const [user, err] = await handlePromise(db(USER_TABLE).insert(userData));

  if (err !== null) {
    return [null, dbError(err)];
  }

  if (user === undefined || user === null) {
    return [null, messageError('Error creating user')];
  }

  return [user, null];
};

// type requestPasswordResetType = {
//   user: User;
// };
//
// export const requestPasswordReset = async ({ user }: requestPasswordResetType): Promise<ValueError<string>> => {
//   await invalidateResetTokens(user.id);
//   const resetToken = crypto.randomBytes(32).toString('hex');
//   const hash = await bcrypt.hash(resetToken, 10);
//   const [, e] = await handlePromise(db(USER_HASH_TABLE).insert({ hash: hash, user_id: user.id }));
//
//   if (e !== null) {
//     return [null, dbError(e)];
//   }
//
//   const [token, signErr] = await JWTService.signResetPasswordToken({ user_id: user.id, token: resetToken });
//
//   if (signErr !== null) {
//     return [null, signErr];
//   }
//
//   const url = `${process.env.BASE_FE_URL ?? ''}/recover-password?token=${token ?? ''}`;
//   sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');
//   const msg = {
//     to: user.email,
//     from: 'sfgoldrush.dev@gmail.com',
//     subject: 'Reset password - Goldrush',
//     text: 'Here is the link to reset your password',
//     html: `Hi,<br><br>
//     <strong>You made a request to reset your password.</strong>
//     <br><br>
//     Please, follow the link below to reset your password. The link expires after 24 hours.</strong>
//     <br><br>
//     <a href="${url}">Reset Password</a>`,
//   };
//
//   const [res, err] = await handlePromise(sendgrid.send(msg));
//
//   if (err !== null) {
//     return [null, messageError('Incorrect email address')];
//   }
//
//   if (res === undefined || res === null) {
//     return [null, messageError('Error sending reset password link')];
//   }
//
//   return ['Reset password link sent', null];
// };
//
// type verifyPasswordResetType = requestPasswordResetType & {
//   token: string;
// };
//
// export const verifyResetPasswordToken = async ({
//   user,
//   token,
// }: verifyPasswordResetType): Promise<ValueError<string>> => {
//   const [user_hash, e] = await handlePromise(db(USER_HASH_TABLE).where(USER_HASH_COLUMNS.user_id, user.id).first());
//
//   if (e !== null) {
//     return [null, dbError(e)];
//   }
//
//   if (user_hash === undefined || user_hash === null) {
//     return [null, messageError('Invalid token')];
//   }
//
//   const isValid = await bcrypt.compare(token, user_hash.hash);
//
//   if (!isValid) {
//     return [null, messageError('Incorrect user token')];
//   }
//
//   return ['Token is valid', null];
// };
//
// export const invalidateResetTokens = async (userId: number): Promise<ValueError<number>> => {
//   const [del, delErr] = await handlePromise(db(USER_HASH_TABLE).del().where(USER_HASH_COLUMNS.user_id, userId));
//
//   if (delErr !== null) {
//     return [null, dbError(delErr)];
//   }
//
//   return [del, null];
// };
