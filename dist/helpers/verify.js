"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPhoneNumber = void 0;
var verifyPhoneNumber = function (phoneNumber) { return /^\+?[1-9]\d{1,14}$/.test(phoneNumber); };
exports.verifyPhoneNumber = verifyPhoneNumber;
//# sourceMappingURL=verify.js.map