/**
 * Rounds a number using decimal precision.
 *
 * @param {number} val Number to round.
 * @param {number} [scale=0] Decimal places.
 * @returns {number} Rounded number.
 */
function round (val, scale = 0) {
  scale = scale <= 0 ? 1 : 10 ** scale
  return Math.round(val * scale) / scale
}

export default round
