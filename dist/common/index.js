"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMethodMeta = void 0;
require("reflect-metadata");
const __1 = require("..");
function addMethodMeta({ method, paths, target, name }) {
    const controller = __1.metadata.controllers[target.constructor.name] || { endpoints: {} };
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
    __1.metadata.controllers[target.constructor.name] = controller;
}
exports.addMethodMeta = addMethodMeta;
