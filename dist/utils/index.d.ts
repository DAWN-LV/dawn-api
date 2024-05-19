declare function ensureArray<T>(item: T | T[]): T[];
declare function merge<T extends Record<string, any>, U extends Record<string, any>>(target: T, source?: U): T & U;
export { merge, ensureArray };
