/**
 * Returns indexes of items that match a predicate.
 *
 * @param {Array<any>} inputs Input array.
 * @param {Function} matcher Predicate function.
 * @returns {Array<number>} Matching indexes.
 */
function getIndex (inputs = [], matcher) {
  return inputs.map((val, idx) => {
    if (matcher(val)) return idx
    return null
  }).filter(val => val !== null)
}

export default getIndex
