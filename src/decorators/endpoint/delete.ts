import { PathType } from "../../types"
import { ensureArray } from "../../utils"
import { addMethodMeta } from "../common"

function Delete(path: PathType | PathType[]) {
  return function (target: Record<string, any>, name: string): void {
    addMethodMeta({ method: "delete", name, paths: ensureArray(path), target })
  }
}

export { Delete }