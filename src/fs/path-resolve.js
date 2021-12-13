const path = require('path')

module.exports = function (item, useSlash = true) {
  item = path.resolve(item)
  if (useSlash) item = item.replace(/\\/g, '/')
  return item
}
