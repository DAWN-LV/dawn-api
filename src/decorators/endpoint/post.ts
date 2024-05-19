import { PathType } from "../../types"
import { ensureArray } from "../../utils"
import { addMethodMeta } from "../common"

function Post(path: PathType | PathType[]) {
  return function (target: Record<string, any>, name: string): void {
    addMethodMeta({ method: "post", name, paths: ensureArray(path), target })
  }
}

export { Post }