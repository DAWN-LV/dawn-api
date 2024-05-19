"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertiesOfClassValidator = exports.translateMetaField = exports.ensureArray = exports.merge = void 0;
const class_validator_1 = require("class-validator");
const cvCodex = {
    "isString": "string",
    "isNumber": "number",
    "isBoolean": "boolean"
};
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
function translateMetaField(metaField) {
    const result = { type: "string", required: false };
    metaField.forEach(it => {
        result.type = cvCodex[it] || result.type;
        result.required = result.required || it.includes('Required');
    });
    return result;
}
exports.translateMetaField = translateMetaField;
function getPropertiesOfClassValidator(targetConstructor) {
    try {
        const metadataStorage = (0, class_validator_1.getMetadataStorage)();
        const targetMetadatas = metadataStorage.getTargetValidationMetadatas(targetConstructor, undefined, false, false);
        const groupedMetadatas = metadataStorage.groupByPropertyName(targetMetadatas);
        return Object.fromEntries(Object.entries(groupedMetadatas).map(([property, decorators]) => {
            const constraintNames = decorators.flatMap(decorator => metadataStorage.getTargetValidatorConstraints(decorator.constraintCls).map(v => v.name));
            return [property, constraintNames];
        }));
    }
    catch (e) {
        e.message += '. This typically happens when you build your TS code with a compiler like EsBuild that does not respect the "emitDecorators:true" configuration. Please recompile your Amala project with tsc or a derivative/combination that involves tsc';
        throw e;
    }
}
exports.getPropertiesOfClassValidator = getPropertiesOfClassValidator;
//# sourceMappingURL=index.js.map