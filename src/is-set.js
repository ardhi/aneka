/**
 * Checks whether a value is neither null nor undefined.
 *
 * @param {any} item Value to test.
 * @returns {boolean} True when value is set.
 */
function isSet (item) {
  return ![undefined, null].includes(item)
}

export default isSet
