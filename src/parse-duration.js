import { isNumber } from 'lodash-es'
import ms from 'ms'
/**
 * Parse duration to its millisecond value. Use {@link https://github.com/vercel/ms|ms} under the hood
 *
 * @param {(number|string)} dur - If string is given, parse this to its millisecond value. Otherwise returns as is
 * @returns {number}
 * @see {@link https://github.com/vercel/ms|ms}
 */
function parseDuration (dur) {
  return isNumber(dur) ? dur : ms(dur)
}

export default parseDuration
