import { forOwn } from 'lodash'

module.exports = function(params) {
  const result = {}
  forOwn(params, (v, k) => {
    let val
    if (v === 'true') val = true
    else if (v === 'false') val = false
    else if (Number(v)) val = Number(v)
    else val = v
    result[k] = val
  })
  return result
}
