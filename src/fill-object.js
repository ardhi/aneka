/**
 * Fill object with keys. ```defValue``` is used if the corresponding key doesn't have value
 *
 * @param {Object} obj - Object to fill
 * @param {string[]} keys - Array of keys
 * @param {any} defValue - Default value
 * @returns {Object}
 */
function fillObject (obj = {}, keys = [], defValue) {
  const newObj = {}
  for (const key of keys) {
    newObj[key] = obj[key] ?? defValue
  }
  return newObj
}

export default fillObject
