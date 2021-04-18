const { findIndex, set } = require('lodash')

module.exports = function (rec, source, key = 'id', tsCol, insert) {
  const idx = findIndex(source, set({}, key, rec[key]))
  if (idx > -1) {
    if (tsCol) {
      if (rec[tsCol] > source[idx][tsCol]) source[idx] = rec
    } else {
      source[idx] = rec
    }
  } else {
    if (insert) source.unshift(rec)
    else source.push(rec)
  }
  return source
}
