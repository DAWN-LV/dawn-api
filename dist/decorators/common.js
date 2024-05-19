"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addArgumentMeta = exports.addMethodMeta = void 0;
require("reflect-metadata");
const globals_1 = require("../globals");
function addMethodMeta({ method, paths, target, name }) {
    const controller = globals_1.metadata.controllers[target.constructor.name] || { endpoints: {} };
    const endpoint = controller.endpoints[name] || { arguments: [] };
    const argumentTypes = Reflect.getMetadata("design:paramtypes", target, name) || [];
    argumentTypes.forEach((argType, idx) => {
        endpoint.arguments[idx] = endpoint.arguments[idx] || {};
        endpoint.arguments[idx].argType = argType;
    });
    endpoint.method = method;
    endpoint.paths = paths;
    endpoint.targetMethod = target[name];
    controller.endpoints[name] = endpoint;
    globals_1.metadata.controllers[target.constructor.name] = controller;
}
exports.addMethodMeta = addMethodMeta;
function addArgumentMeta({ index, key, value, name, target }) {
    const controller = globals_1.metadata.controllers[target.constructor.name] || {};
    const endpoint = controller.endpoints?.[name] || {};
    endpoint.arguments = endpoint.arguments || {};
    endpoint.arguments[index] = { ctxKey: key, ctxValueOptions: value };
    controller.endpoints = { ...controller.endpoints, [name]: endpoint };
    globals_1.metadata.controllers[name] = controller;
}
exports.addArgumentMeta = addArgumentMeta;
//# sourceMappingURL=common.js.map