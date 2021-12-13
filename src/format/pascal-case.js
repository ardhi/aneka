const { upperFirst, camelCase } = require('lodash')

module.exports = function (text) {
  return upperFirst(camelCase(text))
}
