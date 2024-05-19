import { ClassType } from "../../types"
import { ensureArray } from "../../utils"
import { metadata, options } from "../../globals"

function Controller(baseRoute?: string | string[]) {
  return function (target: ClassType): void {
    const routes = ensureArray(baseRoute)

    const controller = metadata.controllers[target.name] || { endpoints: {} }

    controller.paths = routes
    controller.targetClass = target

    metadata.controllers[target.name] = controller

    if (options.logging) {
      console.info(`Interface: Registering controller ${ target.name } at ...`)
    }
  }
}

export { Controller }