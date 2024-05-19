import { OpenAPIV3_1 } from "openapi-types"
import { merge } from "../utils"
import { IMetadata, IOptions, PathType } from "../types"

export let specification: OpenAPIV3_1.Document = {
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
}

function convertRegexp(path: any): string {
  let swaggerPath = ''
  let paramMode = false

  for (const c of path) {
    if (c === ":") {
      paramMode = true
      swaggerPath += '{'
    } 
    else if (paramMode && c === "/") {
      paramMode = false
      swaggerPath += '}/'
    } 
    else {
      swaggerPath += c
    }
  }

  if (paramMode) {
    swaggerPath += '}'
  }

  return swaggerPath
}

function generateSpecification(metadata: IMetadata, options: IOptions) {
  const { openapi } = options

  specification = merge(specification, options.openapi?.spec)

  const meta = { ...metadata }
  const paths: OpenAPIV3_1.PathsObject = {}
  const schemas: Record<string, OpenAPIV3_1.SchemaObject> = {
    Object: {
      type: "object",
      properties: {},
    }
  }
  const servers: OpenAPIV3_1.ServerObject[] = []

  servers.push({ url: openapi?.publicURL })

  // Register schemas
  // ...

  for (const controllerName in meta.controllers) {
    const controller = meta.controllers[controllerName]

    controller.paths.forEach(controllerPath => {
      const basePath = options.basePath + convertRegexp(controllerPath)

      
      for (const endpointName in controller.endpoints) {
        const endpoint = controller.endpoints[endpointName]
        
        endpoint.paths.forEach(endpointPath => {
          const fullPath = basePath + convertRegexp(endpointPath === "/" ? "" : endpointPath)
          const method = endpoint.method

          paths[fullPath] = paths[fullPath] || {}

          const parameters: OpenAPIV3_1.ParameterObject[] = []
          const requestBodyProperties = {}

          // for (const argId in endpoint.arguments) {
          //   const argumentMeta = endpoint.arguments[argId]
          //   const ctxKey = argumentMeta.ctxKey

          //   if (!["body", "query", "params"].includes(ctxKey)) {
          //     continue
          //   }

          //   // Register schema
          //   // ...

          // }

          const requestBody: OpenAPIV3_1.RequestBodyObject = {
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
          }

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
          }
        })
      }
    })
  }

  specification.servers = [...servers, ...(openapi?.spec?.servers || [])]
  specification.paths = paths
  specification.components.schemas = schemas
}

export { generateSpecification }