export const flattenObject = (object: any) => {
  const toReturn = {}
  for (const i in object) {
    if (!object.hasOwnProperty(i)) continue
    if (typeof object[i] === 'object' && object[i] !== null) {
      const flatObject = flattenObject(object[i])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue
        ;(toReturn as any)[i + '.' + x] = (flatObject as any)[x]
      }
    } else {
      ;(toReturn as any)[i] = object[i]
    }
  }
  return toReturn
}
