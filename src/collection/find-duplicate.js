const { map, filter, includes, uniq } = require('lodash')

module.exports = function (collection, prop = 'id') {
  // based on: https://stackoverflow.com/questions/31681732/lodash-get-duplicate-values-from-an-array
  return uniq(filter(map(collection, prop), (val, i, iter) => includes(iter, val, i + 1)))
}
