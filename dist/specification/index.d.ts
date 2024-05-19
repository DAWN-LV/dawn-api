import { OpenAPIV3_1 } from "openapi-types";
import { IMetadata, IOptions } from "../types";
export declare let specification: OpenAPIV3_1.Document;
declare function generateSpecification(metadata: IMetadata, options: IOptions): void;
export { generateSpecification };
