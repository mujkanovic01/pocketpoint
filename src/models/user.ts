import db from '../lib/db-client';

export type User = {
  id: number;
  phone_number: string;
  phone_number_token: string;
  phone_number_verified: boolean;
  pin_hash: string;
  first_name: string;
  last_name: string;
  email: string;
  device_token: string;
  registration_step: number;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
};

export const USER_TABLE = 'users';

export const USER_COLUMNS = {
  id: `${USER_TABLE}.id` as const,
  phone_number: `${USER_TABLE}.phone_number` as const,
  phone_number_token: `${USER_TABLE}.phone_number_token` as const,
  phone_number_verified: `${USER_TABLE}.phone_number_verified` as const,
  pin_hash: `${USER_TABLE}.pin_hash` as const,
  first_name: `${USER_TABLE}.first_name` as const,
  last_name: `${USER_TABLE}.last_name` as const,
  email: `${USER_TABLE}.email` as const,
  device_token: `${USER_TABLE}.device_token` as const,
  registration_step: `${USER_TABLE}.registration_step` as const,
  date_of_birth: `${USER_TABLE}.date_of_birth` as const,
  created_at: `${USER_TABLE}.created_at` as const,
  updated_at: `${USER_TABLE}.updated_at` as const,
};

export const USER_REFS = {
  id: () => db.ref('id').withSchema(USER_TABLE),
  phone_number: () => db.ref('phone_number').withSchema(USER_TABLE),
  phone_number_token: () => db.ref('phone_number_token').withSchema(USER_TABLE),
  phone_number_verified: () => db.ref('phone_number_verified').withSchema(USER_TABLE),
  pin_hash: () => db.ref('pin_hash').withSchema(USER_TABLE),
  first_name: () => db.ref('first_name').withSchema(USER_TABLE),
  last_name: () => db.ref('last_name').withSchema(USER_TABLE),
  email: () => db.ref('email').withSchema(USER_TABLE),
  device_token: () => db.ref('device_token').withSchema(USER_TABLE),
  registration_step: () => db.ref('registration_step').withSchema(USER_TABLE),
  date_of_birth: () => db.ref('date_of_birth').withSchema(USER_TABLE),
  created_at: () => db.ref('created_at').withSchema(USER_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(USER_TABLE),
};

export type UserInsertData = Pick<User, 'phone_number' | 'phone_number_token'>;
export type UserUpdateData = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
