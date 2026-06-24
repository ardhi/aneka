/**
 * Checks whether at least one matcher value exists in an array.
 *
 * @param {string|Array<string>} [matcher=[]] Single matcher or list of matchers.
 * @param {Array<string>} [array=[]] Array to inspect.
 * @returns {boolean} True when any matcher is found.
 */
function includes (matcher = [], array = []) {
  if (typeof matcher === 'string') matcher = [matcher]
  let found = false
  for (const m of matcher) {
    found = array.includes(m)
    if (found) break
  }
  return found
}

export default includes
