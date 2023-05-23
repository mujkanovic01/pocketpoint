"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var dbConfig = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '5432'),
    },
};
var db = (0, knex_1.knex)(dbConfig);
exports.default = db;
//# sourceMappingURL=db-client.js.map