import { PathType } from "../../types"
import { ensureArray } from "../../utils"
import { addMethodMeta } from "../common"

function Put(path: PathType | PathType[]) {
  return function (target: Record<string, any>, name: string): void {
    addMethodMeta({ method: "put", name, paths: ensureArray(path), target })
  }
}

export { Put }