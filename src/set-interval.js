import lockfile from '@bybrave/proper-lockfile2'
import parseDuration from './parse-duration.js'
import fs from 'fs-extra'

/**
 * Like original setInterval, but repeatedly executes a function after a specified delay asynchronously.
 *
 * Function handler will only be executed if the previous execution has completed. This prevents
 * overlapping executions.
 *
 * Optionally using a lock file. If it is provided and the lock file does not exist, it will be created.
 * If the lock file exists and is locked, the handler will not be executed.
 *
 * @param {Function} handler The function to execute after the interval.
 * @param {number|string} timeout The delay in milliseconds or a duration string.
 * @param {Object} [options={}] Additional options.
 * @param {string} [options.lockFile] The path to the lock file. If provided, the handler will only execute if the lock can be acquired.
 * @param {Array} [options.args=[]] Arguments to pass to the handler.
 * @param {Object} [options.lockFileOpts] Options for the lock file.
 * @param {boolean} [options.silent=true] If true, errors during lock acquisition will be ignored.
 * @param {number} [options.maxIterations=Infinity] Maximum number of times to execute the handler.
 * @param {Object} [options.scope] The scope to bind the handler to.
 * @returns {Promise<void>} Promise resolved after the interval.
 */
async function setInterval (handler, timeout, options = {}) {
  const { lockFile, args = [], lockFileOpts, silent = true, maxIterations = Infinity, scope } = options
  timeout = parseDuration(timeout)
  let iterations = 0

  async function execHandler () {
    if (!lockFile) {
      await handler.call(scope, ...args)
      return
    }
    try {
      fs.ensureFileSync(lockFile)
      const release = await lockfile.lock(lockFile, lockFileOpts)
      await handler.call(scope, ...args)
      await release()
    } catch (err) {
      if (!silent) throw err
    }
  }

  async function exec () {
    if (iterations >= maxIterations) return
    await execHandler()
    iterations++
    setTimeout(exec, timeout)
  }

  exec()
}

export default setInterval
