import "reflect-metadata"
import { MethodType, PathType } from "../types"
import { metadata } from "../globals"

export interface ValidationOptions {
  validClass?: Function
  required?: boolean
  trim?: boolean
}

export interface IAddEndpointDTO {
  method: MethodType
  paths: PathType[]
  target: Record<string, any>
  name: string
}

export interface IAddArgumentDTO {
  index: number
  key: string
  value: string | ValidationOptions
  name: string
  target: Record<string, any>
}

function addMethodMeta({ method, paths, target, name }: IAddEndpointDTO): void {
  const controller = metadata.controllers[target.constructor.name] || { endpoints: {} }
  const endpoint = controller.endpoints[name] || { arguments: [] }

  const argumentTypes: any[] = Reflect.getMetadata("design:paramtypes", target, name) || []

  argumentTypes.forEach((argType, idx) => {
    endpoint.arguments[idx] = endpoint.arguments[idx] || {}
    endpoint.arguments[idx].argType = argType
  })

  endpoint.method = method
  endpoint.paths = paths
  endpoint.targetMethod = target[name]

  controller.endpoints[name] = endpoint
  metadata.controllers[target.constructor.name] = controller
}

function addArgumentMeta({ index, key, value, name, target }: IAddArgumentDTO) {
  const controller = metadata.controllers[target.constructor.name] || {}
  const endpoint = controller.endpoints?.[name] || {}

  endpoint.arguments = endpoint.arguments || {}
  endpoint.arguments[index] = { ctxKey: key, ctxValueOptions: value }

  controller.endpoints = { ...controller.endpoints, [name]: endpoint }
  metadata.controllers[name] = controller
}

export { addMethodMeta, addArgumentMeta }