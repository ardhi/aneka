import w from 'lodash-es/without.js'

function without (arr = [], ...params) {
  params.push(null, undefined, '')
  return w(arr, ...params)
}

export default without
