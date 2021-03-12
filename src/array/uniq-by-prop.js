module.exports = function (array, prop) {
  const result = []
  const map = new Map()
  for (const item of array) {
    if (!map.has(item[prop])) {
      map.set(item[prop], true)
      result.push(item)
    }
  }
  return result
}
