/**
 * Merges objects by a shared key, where later objects override earlier fields.
 *
 * @param {Array<Object>} inputs Source objects.
 * @param {string} key Field name used for grouping.
 * @returns {Array<Object>} Merged objects.
 */
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
