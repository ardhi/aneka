/**
 * Schedules execution on the next immediate cycle and resolves when it runs.
 *
 * @returns {Promise<void>} Promise resolved on the immediate queue.
 */
async function setImmediate () {
  return new Promise((resolve) => {
    setImmediate(() => resolve())
  })
}

export default setImmediate
