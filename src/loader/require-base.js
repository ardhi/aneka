const { isFunction } = require('lodash')
const path = require('path')
const pathResolve = require('../fs/path-resolve')

module.exports = async function (file, options) {
  const parsed = path.parse(pathResolve(file))
  try {
    const mod = require(parsed.dir + '/' + parsed.name + '.js')
    if (isFunction(mod)) return await mod(options)
    return mod
  } catch (err) {
    try {
      return require(parsed.dir + '/' + parsed.name + '.json')
    } catch (err) {
      throw err
    }
  }
}
