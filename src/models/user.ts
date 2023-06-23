import db from '../lib/db-client';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  nationality: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
};

export const USER_TABLE = 'users';

export const USER_COLUMNS = {
  id: `${USER_TABLE}.id` as const,
  email: `${USER_TABLE}.email` as const,
  first_name: `${USER_TABLE}.first_name` as const,
  last_name: `${USER_TABLE}.last_name` as const,
  password: `${USER_TABLE}.password` as const,
  date_of_birth: `${USER_TABLE}.date_of_birth` as const,
  nationality: `${USER_TABLE}.nationality` as const,
  created_at: `${USER_TABLE}.created_at` as const,
  updated_at: `${USER_TABLE}.updated_at` as const,
};

export const USER_REFS = {
  id: () => db.ref('id').withSchema(USER_TABLE),
  email: () => db.ref('email').withSchema(USER_TABLE),
  first_name: () => db.ref('first_name').withSchema(USER_TABLE),
  last_name: () => db.ref('last_name').withSchema(USER_TABLE),
  password: () => db.ref('password').withSchema(USER_TABLE),
  date_of_birth: () => db.ref('date_of_birth').withSchema(USER_TABLE),
  nationality: () => db.ref('nationality').withSchema(USER_TABLE),
  created_at: () => db.ref('created_at').withSchema(USER_TABLE),
  updated_at: () => db.ref('updated_at').withSchema(USER_TABLE),
};

export type UserInsertData = Omit<User, 'id' | 'created_at' | 'updated_at'>;
export type UserUpdateData = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
