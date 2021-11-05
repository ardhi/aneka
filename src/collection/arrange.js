const { each, concat, reject, find } = require('lodash')

module.exports = function (coll = [], col = '', names = []) {
  const picked = []
  const misc = reject(coll, c => names.includes(c[col]))
  each(names, n => {
    const item = find(coll, c => c[col] === n)
    if (item) picked.push(item)
  })
  return concat(picked, misc)
}
