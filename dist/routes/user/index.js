"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var getById_1 = require("./getById");
var UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
UserRouter.get('/login', getById_1.GetByIdRoute);
//# sourceMappingURL=index.js.map