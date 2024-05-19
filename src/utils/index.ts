import { getMetadataStorage } from "class-validator"

const cvCodex = {
  "isString": "string",
  "isNumber": "number",
  "isBoolean": "boolean"
}

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

function translateMetaField(metaField: string[]): { type: string, required?: boolean } {
  const result = { type: "string", required: false }
  metaField.forEach(it => {
    result.type = cvCodex[it] || result.type
    result.required = result.required || it.includes('Required')
  })

  return result
}

function getPropertiesOfClassValidator(targetConstructor: Function): Record<string, string[]> {
  try {
    const metadataStorage = getMetadataStorage()
    const targetMetadatas = metadataStorage.getTargetValidationMetadatas(targetConstructor, undefined, false, false)
    const groupedMetadatas = metadataStorage.groupByPropertyName(targetMetadatas)

    return Object.fromEntries(
      Object.entries(groupedMetadatas).map(([property, decorators]) => {
        const constraintNames = decorators.flatMap(decorator => 
          metadataStorage.getTargetValidatorConstraints(decorator.constraintCls).map(v => v.name)
        )
        return [property, constraintNames]
      })
    )
  } catch (e) {
    e.message += '. This typically happens when you build your TS code with a compiler like EsBuild that does not respect the "emitDecorators:true" configuration. Please recompile your Amala project with tsc or a derivative/combination that involves tsc'
    throw e
  }
}

export { merge, ensureArray, translateMetaField, getPropertiesOfClassValidator }