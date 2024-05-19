"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpecification = exports.specification = void 0;
const utils_1 = require("../utils");
exports.specification = {
    openapi: "3.0.1",
    info: {
        title: "API",
        description: "Author is Vitalijs Pankovs (<URL>)",
        version: "1.0.0"
    },
    servers: [],
    paths: {},
    components: {
        schemas: {}
    },
    security: [],
    tags: [],
    externalDocs: undefined
};
function convertRegexp(path) {
    let swaggerPath = '';
    let paramMode = false;
    for (const c of path) {
        if (c === ":") {
            paramMode = true;
            swaggerPath += '{';
        }
        else if (paramMode && c === "/") {
            paramMode = false;
            swaggerPath += '}/';
        }
        else {
            swaggerPath += c;
        }
    }
    if (paramMode) {
        swaggerPath += '}';
    }
    return swaggerPath;
}
function generateSpecification(metadata, options) {
    const { openapi } = options;
    exports.specification = (0, utils_1.merge)(exports.specification, options.openapi?.spec);
    const meta = { ...metadata };
    const paths = {};
    const schemas = {
        Object: {
            type: "object",
            properties: {},
        }
    };
    const servers = [];
    servers.push({ url: openapi?.publicURL });
    // Register schemas
    // ...
    for (const controllerName in meta.controllers) {
        const controller = meta.controllers[controllerName];
        controller.paths.forEach(controllerPath => {
            const basePath = options.basePath + convertRegexp(controllerPath);
            for (const endpointName in controller.endpoints) {
                const endpoint = controller.endpoints[endpointName];
                endpoint.paths.forEach(endpointPath => {
                    const fullPath = basePath + convertRegexp(endpointPath === "/" ? "" : endpointPath);
                    const method = endpoint.method;
                    paths[fullPath] = paths[fullPath] || {};
                    const parameters = [];
                    const requestBodyProperties = {};
                    // for (const argId in endpoint.arguments) {
                    //   const argumentMeta = endpoint.arguments[argId]
                    //   const ctxKey = argumentMeta.ctxKey
                    //   if (!["body", "query", "params"].includes(ctxKey)) {
                    //     continue
                    //   }
                    //   // Register schema
                    //   // ...
                    // }
                    const requestBody = {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: requestBodyProperties,
                                },
                            },
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    type: "object",
                                    properties: requestBodyProperties,
                                }
                            }
                        }
                    };
                    paths[fullPath][method] = {
                        operationId: `${controllerName}.${endpointName}`,
                        summary: endpointName,
                        tags: [controllerName],
                        // // @ts-ignore
                        // requestBody: Object.keys(requestBodyProperties).length > 0 ? requestBody : undefined,
                        parameters,
                        responses: {
                            "2xx": {
                                description: "Successful response",
                                headers: {},
                                content: {
                                    "application/json": {
                                        schema: { $ref: `#/components/schemas/Object` },
                                    }
                                }
                            }
                        }
                    };
                });
            }
        });
    }
    exports.specification.servers = [...servers, ...(openapi?.spec?.servers || [])];
    exports.specification.paths = paths;
    exports.specification.components.schemas = schemas;
}
exports.generateSpecification = generateSpecification;
//# sourceMappingURL=index.js.map