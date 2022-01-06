const print = require('./print')
const { get } = require('lodash')
const isSet = require('./is-set')

module.exports = function (msg, terminate) {
  if (!isSet(terminate)) terminate = true
  const debug = get(process, 'env.DEBUG', false)
  if (msg instanceof Error) msg = msg.message
  print(msg, terminate, debug ? 'trace' : 'error')
}
