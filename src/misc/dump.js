const util = require('util')

module.exports = function (obj) {
  const result = util.inspect(obj, false, null, true)
  console.log(result)
}
