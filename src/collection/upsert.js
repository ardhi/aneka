const { findIndex, set } = require('lodash')

module.exports = function (item, collection, key = 'id', tsCol, insert) {
  const idx = findIndex(collection, set({}, key, item[key]))
  if (idx > -1) {
    if (tsCol) {
      if (item[tsCol] > collection[idx][tsCol]) collection[idx] = item
    } else {
      collection[idx] = item
    }
  } else {
    if (insert) collection.unshift(item)
    else collection.push(item)
  }
}
