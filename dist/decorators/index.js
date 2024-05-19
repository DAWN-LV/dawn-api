"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = exports.Delete = exports.Put = exports.Get = exports.Post = exports.Controller = void 0;
// Controller decorators
var controller_1 = require("./controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_1.Controller; } });
// Endpoint decorators
var post_1 = require("./endpoint/post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return post_1.Post; } });
var get_1 = require("./endpoint/get");
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return get_1.Get; } });
var put_1 = require("./endpoint/put");
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return put_1.Put; } });
var delete_1 = require("./endpoint/delete");
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return delete_1.Delete; } });
// Argument decorators
var body_1 = require("./endpoint/arg/body");
Object.defineProperty(exports, "Body", { enumerable: true, get: function () { return body_1.Body; } });
//# sourceMappingURL=index.js.map