import lockfile from '@bybrave/proper-lockfile2'
import delay from './delay.js'

/**
 * Like original setTimeout, but executes a function after a specified delay asynchronously.
 * Optionally using a lock file.
 *
 * @param {Function} handler The function to execute after the timeout.
 * @param {number|string} timeout The delay in milliseconds or a duration string.
 * @param {Object} [options={}] Additional options.
 * @param {string} [options.lockFile] The path to the lock file. If set, the handler will only execute if the lock can be acquired.
 * @param {Array} [options.args=[]] Arguments to pass to the handler.
 * @param {Object} [options.lockFileOpts] Options for the lock file.
 * @param {boolean} [options.silent=true] If true, errors during lock acquisition will be ignored.
 * @param {Object} [options.scope] The scope to bind the handler to.
 * @returns {Promise<void>} Promise resolved after the delay.
 */
async function setTimeout (handler, timeout, options = {}) {
  const { lockFile, args = [], lockFileOpts, silent = true, scope } = options
  await delay(timeout)
  if (!lockFile) {
    await handler.call(scope, ...args)
    return
  }
  try {
    const release = await lockfile.lock(lockFile, lockFileOpts)
    await handler.call(scope, ...args)
    await release()
  } catch (err) {
    if (!silent) throw err
  }
}

export default setTimeout
