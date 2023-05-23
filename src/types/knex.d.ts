import { Knex } from 'knex';
import { User, USER_TABLE, UserInsertData, UserUpdateData } from '../models';

declare module 'knex/types/tables' {
  interface Tables {
    [USER_TABLE]: Knex.CompositeTableType<User, UserInsertData, UserUpdateData>;
  }
}

declare module 'knex/types/result' {
  interface Registry {
    Count: number;
  }
}
