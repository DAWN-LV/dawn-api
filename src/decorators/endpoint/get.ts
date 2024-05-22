import { PathType } from "../../types"
import { ensureArray } from "../../utils"
import { addMethodMeta } from "../common"

function Get(path: PathType | PathType[]) {
  return function (target: Record<string, any>, name: string): void {
    addMethodMeta({ method: "get", name, paths: ensureArray(path), target })
  }
}

export { Get }
