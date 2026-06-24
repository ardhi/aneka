import w from 'lodash-es/without.js'

/**
 * Returns an array without provided values and empty-like entries.
 *
 * @param {Array<any>} [arr=[]] Source array.
 * @param {...any} params Values to exclude.
 * @returns {Array<any>} Filtered array.
 * @example
 * without([1, 2, null, '', 3, 2], 2)
 * // => [1, 3]
 */
function without (arr = [], ...params) {
  params.push(null, undefined, '')
  return w(arr, ...params)
}

export default without
