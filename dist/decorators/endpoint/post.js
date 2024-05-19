"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const utils_1 = require("../../utils");
const common_1 = require("../common");
function Post(path) {
    return function (target, name) {
        (0, common_1.addMethodMeta)({ method: "post", name, paths: (0, utils_1.ensureArray)(path), target });
    };
}
exports.Post = Post;
//# sourceMappingURL=post.js.map