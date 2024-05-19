declare function ensureArray<T>(item: T | T[]): T[];
declare function merge<T extends Record<string, any>, U extends Record<string, any>>(target: T, source?: U): T & U;
declare function translateMetaField(metaField: string[]): {
    type: string;
    required?: boolean;
};
declare function getPropertiesOfClassValidator(targetConstructor: Function): Record<string, string[]>;
export { merge, ensureArray, translateMetaField, getPropertiesOfClassValidator };
