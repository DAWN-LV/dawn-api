import { ValidationOptions } from "../../../decorators/common";
declare function Body(options?: string | ValidationOptions): (target: Record<string, any>, name: string, index: number) => void;
export { Body };
