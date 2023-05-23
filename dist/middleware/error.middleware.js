"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var handleDbError = function (err) {
    // eslint-disable-next-line no-console
    console.error('DB Error', err.error);
    return {
        error: { message: 'Database error' },
        data: null,
    };
};
var handleDefaultError = function (err) {
    // eslint-disable-next-line no-console
    console.error('Default Error', err.error);
    return {
        error: { message: err.error.message },
        data: null,
    };
};
var errorMiddleware = function (errorData, req, res, next) {
    switch (errorData.type) {
        case 'db':
            return res.status(500).json(handleDbError(errorData));
        case 'default':
            return res.status(400).json(handleDefaultError(errorData));
    }
    next();
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map