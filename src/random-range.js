/**
 * Generate random value
 *
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {boolean} alpha - Set ```true``` to return alphanumeric characters
 * @returns
 */
function randomRange (min = 0, max = 65439, alpha = false) {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  if (!alpha) return num
  return String.fromCharCode(96 + num)
}

export default randomRange
