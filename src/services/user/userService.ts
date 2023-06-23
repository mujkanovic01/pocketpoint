import {Tournament, User, USER_COLUMNS, USER_TABLE} from '../../models';
import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';
// import bcrypt from 'bcrypt';

export const getById = async (id: number): Promise<ValueError<User>> => {
  const [user, err] = await handlePromise(db(USER_TABLE).where(USER_COLUMNS.id, id).first());

  if (err !== null) {
    return [null, dbError(err)];
  }
  if (user === undefined) {
    return [null, messageError("User doesn't exist")];
  }

  return [user, null];
};

export const getAllUsers = async (): Promise<ValueError<User[]>> => {
  const [users, err] = await handlePromise(db('users'));

  if (err !== null) {
    return [null, dbError(err)];
  }

  return [users, null];
};

export const getByEmail = async (email: string): Promise<ValueError<User>> => {
  const [user, err] = await handlePromise(db(USER_TABLE).where(USER_COLUMNS.email, email).first());

  if (err !== null) {
    return [null, dbError(err)];
  }
  if (user === undefined) {
    return [null, messageError("User doesn't exist")];
  }

  return [user, null];
};

export const getUsersByName = async (name: string): Promise<ValueError<User[]>> => {
  const [users, err] = await handlePromise(db(USER_TABLE).where(USER_COLUMNS.first_name, 'like', `%${name}%`).orWhere(USER_COLUMNS.last_name, 'like', `%${name}%`));

  if (err !== null) {
    return [null, dbError(err)];
  }
  if (users === undefined) {
    return [null, messageError("User doesn't exist")];
  }

  return [users, null];
};

export const deleteById = async (id: number): Promise<ValueError<string>> => {
  const [numOfDelUser, err] = await handlePromise(db(USER_TABLE).where(USER_COLUMNS.id, id).first().del());

  if (err !== null) {
    return [null, dbError(err)];
  }

  if (numOfDelUser !== 1) {
    return [null, messageError('User delete process failed')];
  }

  return ['User successfully deleted', null];
};
