import { PathType } from "../../types";
declare function Post(path: PathType | PathType[]): (target: Record<string, any>, name: string) => void;
export { Post };
