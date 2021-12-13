const pathResolve = require('../fs/path-resolve')
const getGlobalModuleDir = require('./get-global-module-dir')
const path = require('path')

module.exports = function (name) {
  const pkg = name + '/package.json'
  let pkgFile
  try {
    pkgFile = require.resolve(pathResolve(pkg))
  } catch (err) {
    try {
      pkgFile = require.resolve(pkg)
    } catch (err) {
      try {
        pkgFile = require.resolve(process.cwd() + '/node_modules/' + pkg)
      } catch (err) {
        try {
          pkgFile = getGlobalModuleDir(pkg)
        } catch (err) {}
      }
    }
  }
  if (!pkgFile) throw new Error(`Can't get module directory '${name}' as file nor local/global module`)
  return pathResolve(path.dirname(pkgFile))
}
