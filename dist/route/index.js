"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoutes = exports.generateEndPoints = exports.determineArgument = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
async function determineArgument(req, res, argument, options) {
    let values;
    const { ctxKey, ctxValueOptions, argType } = argument;
    values = req[ctxKey];
    if (values && ctxValueOptions) {
        values = values[ctxValueOptions];
    }
    const shouldValidate = values && argType && ['body', 'params', 'query'].includes(ctxKey);
    if (shouldValidate) {
        values = (0, class_transformer_1.plainToInstance)(argType, values, { enableImplicitConversion: true });
        const errors = await (0, class_validator_1.validate)(values, options.validatorOptions);
        if (errors.length > 0) {
            res.status(400).json({
                message: 'Validation error',
                errors: errors.map(it => ({ field: it.property, violations: it.constraints }))
            });
            throw new Error('Validation error');
        }
    }
    else if (values && argType && argType !== String) {
        values = argType(values);
    }
    return values;
}
exports.determineArgument = determineArgument;
async function generateEndPoints(router, options, controller, parentPath) {
    const endpoints = Object.values(controller.endpoints);
    console.log(endpoints);
    for (const endpoint of endpoints) {
        for (const endpointPath of endpoint.paths) {
            const path = '/' + (parentPath + '/' + endpointPath).split('/').filter(i => i.length).join('/');
            const middlewares = [...(controller.flow || []), ...(endpoint.flow || [])];
            const handler = async (req, res, next) => {
                try {
                    const targetArguments = [];
                    if (endpoint.arguments) {
                        for (const index of Object.keys(endpoint.arguments)) {
                            const numIndex = Number(index);
                            const argumentMeta = endpoint.arguments[numIndex];
                            targetArguments[numIndex] = await determineArgument(req, res, argumentMeta, options);
                        }
                    }
                    const controllerInstance = new controller.targetClass(req, res);
                    const result = await endpoint.targetMethod.apply(controllerInstance, targetArguments);
                    res.json(result);
                }
                catch (err) {
                    next(err);
                }
            };
            middlewares.push(handler);
            if (options.logging) {
                console.info(`Generating ${endpoint.method} ${path}`);
            }
            router[endpoint.method](path, ...middlewares);
        }
    }
}
exports.generateEndPoints = generateEndPoints;
async function generateRoutes(router, options, metadata) {
    if (options.logging) {
        console.log("Generating routes for metadata...");
    }
    const basePath = options.basePath || '';
    const controllers = Object.values(metadata.controllers);
    for (const controller of controllers) {
        for (const path of controller.paths) {
            await generateEndPoints(router, options, controller, basePath + path);
        }
    }
}
exports.generateRoutes = generateRoutes;
