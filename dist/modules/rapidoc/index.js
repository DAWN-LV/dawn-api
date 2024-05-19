"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RapidocModule = void 0;
const path_1 = __importDefault(require("path"));
const specification_1 = require("../../specification");
const globals_1 = require("../../globals");
class RapidocModule {
    static async createDocument(app, options) {
        options.openapi = options.openapi || { enabled: true, publicURL: "http://[publicURl]" };
        (0, specification_1.generateSpecification)(globals_1.metadata, options);
        app.get("/specification", (_, res) => res.send(specification_1.specification));
        app.get(options.basePath, (_, res) => {
            res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
        });
    }
}
exports.RapidocModule = RapidocModule;
//# sourceMappingURL=index.js.map