const getGlobalModuleDir = require('./get-global-module-dir')

module.exports = function (name) {
  return require(getGlobalModuleDir(name))
}
