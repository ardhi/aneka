function mergeObjectsByKey (inputs, key) {
  const uniqueMap = new Map()

  for (const item of inputs) {
    const keyValue = item[key]
    if (uniqueMap.has(keyValue)) {
      const existingObject = uniqueMap.get(keyValue)
      uniqueMap.set(keyValue, { ...existingObject, ...item })
    } else {
      uniqueMap.set(keyValue, item)
    }
  }

  return Array.from(uniqueMap.values())
}

export default mergeObjectsByKey
