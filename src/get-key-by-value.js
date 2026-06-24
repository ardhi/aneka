/**
 * Finds an object key by value.
 *
 * @param {Object} object Source object.
 * @param {any} value Value to find.
 * @returns {string|undefined} Matching key.
 */
function getKeyByValue (object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

export default getKeyByValue
