const { findIndex, set, pullAt } = require('lodash')

module.exports = function (item, collection, key = 'id') {
  const idx = findIndex(collection, set({}, key, item[key]))
  return pullAt(collection, [idx])
}
