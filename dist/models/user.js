"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_REFS = exports.USER_COLUMNS = exports.USER_TABLE = void 0;
var db_client_1 = __importDefault(require("../lib/db-client"));
exports.USER_TABLE = 'users';
exports.USER_COLUMNS = {
    id: "".concat(exports.USER_TABLE, ".id"),
    phone_number: "".concat(exports.USER_TABLE, ".phone_number"),
    phone_number_token: "".concat(exports.USER_TABLE, ".phone_number_token"),
    phone_number_verified: "".concat(exports.USER_TABLE, ".phone_number_verified"),
    pin_hash: "".concat(exports.USER_TABLE, ".pin_hash"),
    first_name: "".concat(exports.USER_TABLE, ".first_name"),
    last_name: "".concat(exports.USER_TABLE, ".last_name"),
    email: "".concat(exports.USER_TABLE, ".email"),
    device_token: "".concat(exports.USER_TABLE, ".device_token"),
    registration_step: "".concat(exports.USER_TABLE, ".registration_step"),
    date_of_birth: "".concat(exports.USER_TABLE, ".date_of_birth"),
    created_at: "".concat(exports.USER_TABLE, ".created_at"),
    updated_at: "".concat(exports.USER_TABLE, ".updated_at"),
};
exports.USER_REFS = {
    id: function () { return db_client_1.default.ref('id').withSchema(exports.USER_TABLE); },
    phone_number: function () { return db_client_1.default.ref('phone_number').withSchema(exports.USER_TABLE); },
    phone_number_token: function () { return db_client_1.default.ref('phone_number_token').withSchema(exports.USER_TABLE); },
    phone_number_verified: function () { return db_client_1.default.ref('phone_number_verified').withSchema(exports.USER_TABLE); },
    pin_hash: function () { return db_client_1.default.ref('pin_hash').withSchema(exports.USER_TABLE); },
    first_name: function () { return db_client_1.default.ref('first_name').withSchema(exports.USER_TABLE); },
    last_name: function () { return db_client_1.default.ref('last_name').withSchema(exports.USER_TABLE); },
    email: function () { return db_client_1.default.ref('email').withSchema(exports.USER_TABLE); },
    device_token: function () { return db_client_1.default.ref('device_token').withSchema(exports.USER_TABLE); },
    registration_step: function () { return db_client_1.default.ref('registration_step').withSchema(exports.USER_TABLE); },
    date_of_birth: function () { return db_client_1.default.ref('date_of_birth').withSchema(exports.USER_TABLE); },
    created_at: function () { return db_client_1.default.ref('created_at').withSchema(exports.USER_TABLE); },
    updated_at: function () { return db_client_1.default.ref('updated_at').withSchema(exports.USER_TABLE); },
};
//# sourceMappingURL=user.js.map