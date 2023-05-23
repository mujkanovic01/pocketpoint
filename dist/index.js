"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./lib/dayjs");
var helpers_1 = require("./helpers");
var middleware_1 = require("./middleware");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.status(200).json((0, helpers_1.successResponse)('Welcome to the API'));
});
app.use(middleware_1.errorMiddleware);
app.use('/user', routes_1.UserRouter);
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map