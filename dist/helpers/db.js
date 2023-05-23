"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRefs = void 0;
function allRefs(refs) {
    return Object.values(refs).map(function (ref) { return ref(); });
}
exports.allRefs = allRefs;
//# sourceMappingURL=db.js.map