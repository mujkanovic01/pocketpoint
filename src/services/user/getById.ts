import { User, USER_COLUMNS, USER_TABLE } from '../../models';
import { dbError, handlePromise, messageError, ValueError } from '../../helpers';
import db from '../../lib/db-client';

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
