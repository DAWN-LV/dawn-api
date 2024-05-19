import { Request, Response, NextFunction } from "express";
import { OpenAPIV3_1 } from "openapi-types";
export type ClassType<T = any> = new (...args: any[]) => T;
export type FlowType = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export type MethodType = "get" | "post" | "delete" | "put";
export type PathType = string | RegExp;
export interface IOptions {
    logging?: boolean;
    basePath?: string;
    openapi?: {
        webPath?: string;
        specPath?: string;
        publicURL: string;
        spec?: Partial<{
            info: Partial<OpenAPIV3_1.InfoObject>;
            servers?: OpenAPIV3_1.ServerObject[];
            paths: Partial<OpenAPIV3_1.PathsObject>;
            components?: Partial<OpenAPIV3_1.ComponentsObject>;
            security?: Partial<OpenAPIV3_1.SecurityRequirementObject>[];
            tags?: Partial<OpenAPIV3_1.TagObject[]>;
            externalDocs?: Partial<OpenAPIV3_1.ExternalDocumentationObject>;
        }>;
    };
}
export interface IMetadataArgument {
    ctxKey?: string;
    ctxValueOptions?: any;
    argType?: any;
}
export interface IMetadataEndpoint {
    method?: MethodType;
    paths?: PathType[];
    arguments?: Record<number, IMetadataArgument>;
    targetMethod?: () => Promise<unknown>;
}
export interface IMetadataController {
    paths?: PathType[];
    endpoints?: Record<string, IMetadataEndpoint>;
    targetClass?: ClassType;
}
export interface IMetadata {
    controllers: Record<string, IMetadataController>;
}
