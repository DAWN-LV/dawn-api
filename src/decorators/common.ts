import "reflect-metadata"
import { MethodType, PathType } from "../types"
import { metadata } from "../globals"

export interface IAddEndpointDTO {
  method: MethodType
  paths: PathType[]
  target: Record<string, any>
  name: string
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

export { addMethodMeta }