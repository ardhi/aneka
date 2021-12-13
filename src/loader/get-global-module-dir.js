const globalDirs = require('global-dirs')
const path = require('path')
const pathResolve = require('../fs/path-resolve')

module.exports = function (moduleId) {
  try {
    return pathResolve(path.dirname(require.resolve(path.join(globalDirs.yarn.packages, moduleId, 'package.json'))))
  } catch (err) {
    return pathResolve(path.dirname(require.resolve(path.join(globalDirs.npm.packages, moduleId, 'package.json'))))
  }
}
