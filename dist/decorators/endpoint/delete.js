"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const utils_1 = require("../../utils");
const common_1 = require("../common");
function Delete(path) {
    return function (target, name) {
        (0, common_1.addMethodMeta)({ method: "delete", name, paths: (0, utils_1.ensureArray)(path), target });
    };
}
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map