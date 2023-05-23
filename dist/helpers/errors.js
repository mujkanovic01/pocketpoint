"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unexpectedError = exports.defaultError = exports.dbError = exports.messageError = void 0;
var messageError = function (message) { return ({
    error: Error(message),
    data: null,
    type: 'default',
}); };
exports.messageError = messageError;
var dbError = function (error) { return ({
    error: error !== null && error !== void 0 ? error : Error('Unknown error'),
    data: null,
    type: 'db',
}); };
exports.dbError = dbError;
var defaultError = function (error) { return ({
    error: error !== null && error !== void 0 ? error : Error('Unknown error'),
    data: null,
    type: 'default',
}); };
exports.defaultError = defaultError;
var unexpectedError = function () { return ({
    error: Error('Unexpected error'),
    data: null,
    type: 'default',
}); };
exports.unexpectedError = unexpectedError;
//# sourceMappingURL=errors.js.map