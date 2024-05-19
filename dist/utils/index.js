"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureArray = exports.merge = void 0;
function isObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}
function ensureArray(item) {
    if (!item) {
        return [];
    }
    return Array.isArray(item) ? item : [item];
}
exports.ensureArray = ensureArray;
function merge(target, source) {
    if (!isObject(target) || !isObject(source)) {
        return target;
    }
    const result = { ...target };
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(source[key]) && isObject(target[key])) {
                result[key] = merge(target[key], source[key]);
            }
            else {
                result[key] = source[key];
            }
        }
    }
    return result;
}
exports.merge = merge;
//# sourceMappingURL=index.js.map