const pathResolve = require('../fs/path-resolve')
const path = require('path')

module.exports = function (name) {
  name = name + '/package.json'
  return pathResolve(path.dirname(require.resolve(pathResolve(name))))
}
