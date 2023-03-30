const wt = require('worker-timers')

module.exports = function (ms = 1000, useWorker) {
  return new Promise((resolve, reject) => {
    let timer
    if (useWorker) {
      timer = wt.setTimeout(() => {
        if (timer) wt.clearTimeout(timer)
        resolve()
      }, ms)
    } else {
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        resolve()
      }, ms)
    }
  })
}
