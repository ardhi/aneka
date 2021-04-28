const { findIndex, set, pullAt, each } = require('lodash')

module.exports = function (items, collection, key = 'id') {
  const idxs = []
  each(items, item => {
    const idx = findIndex(collection, set({}, key, item[key]))
    if (idx > -1) idxs.push(idx)
  })
  return pullAt(idxs)
}
