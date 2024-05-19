function isObject(obj: any): obj is Record<string, any> {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

function ensureArray<T>(item: T | T[]): T[] {
  if (!item) {
    return []
  }

  return Array.isArray(item) ? item : [item]
}

function merge<T extends Record<string, any>, U extends Record<string, any>>(target: T, source?: U): T & U {
  if (!isObject(target) || !isObject(source)) {
    return target as T & U
  }

  const result: Record<string, any> = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(target[key])) {
        result[key] = merge(target[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  }

  return result as T & U
}

export { merge, ensureArray }