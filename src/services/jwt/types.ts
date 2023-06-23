import { JwtPayload } from 'jsonwebtoken';

export type BaseJWTPayload = { type: 'access' | 'reset' } & JwtPayload;
export type AccessJWTPayload = { user_id: number; type: 'access' } & JwtPayload;
export type ResetPasswordJWTPayload = { user_id: number; token: string; type: 'reset' } & JwtPayload;
