const print = require('./print')
const { get } = require('lodash')

module.exports = msg => {
  const debug = get(process, 'env.DEBUG', false)
  if (msg instanceof Error) msg = msg.message
  print(msg, true, debug ? 'trace' : 'error')
}
