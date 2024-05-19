"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = void 0;
const utils_1 = require("../../utils");
const common_1 = require("../common");
function Put(path) {
    return function (target, name) {
        (0, common_1.addMethodMeta)({ method: "put", name, paths: (0, utils_1.ensureArray)(path), target });
    };
}
exports.Put = Put;
//# sourceMappingURL=put.js.map