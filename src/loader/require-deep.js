/*
const getModuleDirDeep = require('./get-module-dir-deep')

module.exports = function (name) {
  return require(getModuleDirDeep(name))
}
*/
const requireGlobal = require('./require-global')
const pathResolve = require('../fs/path-resolve')

module.exports = function (name) {
  let mod
  try {
    mod = require(pathResolve(name))
  } catch (err) {
    try {
      mod = require(name)
    } catch (err) {
      try {
        mod = require(process.cwd() + '/node_modules/' + name)
      } catch (err) {
        try {
          mod = requireGlobal(name)
        } catch (err) {}
      }
    }
  }
  if (!mod) throw new Error(`Can't load '${name}' as file nor local/global module`)
  return mod
}
