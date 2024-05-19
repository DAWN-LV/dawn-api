"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const utils_1 = require("../../utils");
const globals_1 = require("../../globals");
function Controller(baseRoute) {
    return function (target) {
        const routes = (0, utils_1.ensureArray)(baseRoute);
        const controller = globals_1.metadata.controllers[target.name] || { endpoints: {} };
        controller.paths = routes;
        controller.targetClass = target;
        globals_1.metadata.controllers[target.name] = controller;
        if (globals_1.options.logging) {
            console.info(`Interface: Registering controller ${target.name} at ...`);
        }
    };
}
exports.Controller = Controller;
//# sourceMappingURL=index.js.map