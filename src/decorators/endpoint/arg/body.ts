import { ValidationOptions, addArgumentMeta } from "src/decorators/common"

function Body(options?: string | ValidationOptions) {
  return function (target: Record<string, any>, name: string, index: number) {
    addArgumentMeta({ index, key: "body", value: options, name, target })
  }
}

export { Body }