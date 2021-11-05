// source: https://flaviocopes.com/how-to-divide-collay-js/
module.exports = function (coll, groupCount) {
  const result = []
  for (let i = 0; i < groupCount; i++) {
    result.push([])
  }
  const wordsPerLine = Math.ceil(coll.length / groupCount)
  for (let line = 0; line < groupCount; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = coll[i + line * wordsPerLine]
      if (!value) continue
      result[line].push(value)
    }
  }
  return result
}
