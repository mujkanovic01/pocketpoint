import { knex, Knex } from 'knex';

const dbConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT ?? '5432'),
  },
};

const db = knex(dbConfig);

export default db;
