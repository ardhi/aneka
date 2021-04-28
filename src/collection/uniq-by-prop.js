module.exports = function (collection, prop) {
  const result = []
  const map = new Map()
  for (const item of collection) {
    if (!map.has(item[prop])) {
      map.set(item[prop], true)
      result.push(item)
    }
  }
  return result
}
