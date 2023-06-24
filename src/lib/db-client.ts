import { knex, Knex } from 'knex';
import { config } from 'dotenv';
config();

const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT ?? '3306'),
  },
};

const db = knex(dbConfig);
export default db;
