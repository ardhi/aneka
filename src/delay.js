import parseDuration from './parse-duration.js'

/**
 * Waits for a duration and resolves a promise.
 *
 * @param {number|string} [ms=1000] Delay in milliseconds or a duration string.
 * @returns {Promise<void>} Promise resolved after the delay.
 */
function delay (ms = 1000) {
  ms = parseDuration(ms)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (timer) clearTimeout(timer)
      resolve()
    }, ms)
  })
}

export default delay
