"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const common_1 = require("../../../decorators/common");
function Body(options) {
    return function (target, name, index) {
        (0, common_1.addArgumentMeta)({ index, key: "body", value: options, name, target });
    };
}
exports.Body = Body;
//# sourceMappingURL=body.js.map