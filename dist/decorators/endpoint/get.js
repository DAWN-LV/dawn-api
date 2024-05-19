"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const utils_1 = require("../../utils");
const common_1 = require("../common");
function Get(path) {
    return function (target, name) {
        (0, common_1.addMethodMeta)({ method: "get", name, paths: (0, utils_1.ensureArray)(path), target });
    };
}
exports.Get = Get;
//# sourceMappingURL=get.js.map