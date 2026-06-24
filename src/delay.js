/**
 * Waits for a duration and resolves a promise.
 *
 * @param {number} [ms=1000] Delay in milliseconds.
 * @returns {Promise<void>} Promise resolved after the delay.
 */
function delay (ms = 1000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (timer) clearTimeout(timer)
      resolve()
    }, ms)
  })
}

export default delay
