import "reflect-metadata";
import { MethodType, PathType } from "../types";
export interface IAddEndpointDTO {
    method: MethodType;
    paths: PathType[];
    target: Record<string, any>;
    name: string;
}
declare function addMethodMeta({ method, paths, target, name }: IAddEndpointDTO): void;
export { addMethodMeta };
