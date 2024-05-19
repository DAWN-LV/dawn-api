import { Express } from "express";
import { IOptions } from "../../types";
declare abstract class RapidocModule {
    static createDocument(app: Express, options: IOptions): Promise<void>;
}
export { RapidocModule };
