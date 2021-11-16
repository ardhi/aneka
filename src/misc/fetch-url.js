const axios = require('axios')
const { has, isString, omit } = require('lodash')
const qs = require('query-string')

const handleSuccess = (resp, opts, cfg) => {
  return resp.data
}

const handleError = (err, opts, cfg) => {
  return err
}

module.exports = function (opts = {}, cfg = {}) {
  return new Promise((resolve, reject) => {
    if (isString(opts)) opts = { url: opts }
    opts.params = opts.params || {}
    if (!has(cfg, 'cacheBuster')) cfg.cacheBuster = true
    if (cfg.cacheBuster) opts.params[cfg.cacheBusterKey || '_'] = Date.now()
    if (cfg.streamHandler) {
      opts.url = `${opts.url}?${qs.stringify(opts.params)}`
      let error
      fetch(opts.url, omit(opts, ['url', 'params']))
        .then(resp => {
          if (!resp.ok) {
            error = resp
            return false
          }
          return cfg.streamHandler(resp)
        })
        .then(resp => {
          if (!resp) return false
          resolve(handleSuccess({ data: resp }, opts, cfg))
        })
        .then(resp => {
          const e = new Error(error.statusText)
          e.status = error.status
          reject(handleError(e, opts, cfg))
        })
        .catch(err => {
          reject(handleError(err, opts, cfg))
        })
      return
    }
    axios(opts)
      .then(resp => {
        resolve(handleSuccess(resp, opts, cfg))
      })
      .catch(err => {
        reject(handleError(err, opts, cfg))
      })
  })
}
