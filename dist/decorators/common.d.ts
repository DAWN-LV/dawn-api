import "reflect-metadata";
import { MethodType, PathType } from "../types";
export interface ValidationOptions {
    validClass?: Function;
    required?: boolean;
    trim?: boolean;
}
export interface IAddEndpointDTO {
    method: MethodType;
    paths: PathType[];
    target: Record<string, any>;
    name: string;
}
export interface IAddArgumentDTO {
    index: number;
    key: string;
    value: string | ValidationOptions;
    name: string;
    target: Record<string, any>;
}
declare function addMethodMeta({ method, paths, target, name }: IAddEndpointDTO): void;
declare function addArgumentMeta({ index, key, value, name, target }: IAddArgumentDTO): void;
export { addMethodMeta, addArgumentMeta };
