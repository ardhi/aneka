/**
 * Async/await wrapper for setImmediate
 */
async function setImmediate () {
  return new Promise((resolve) => {
    setImmediate(() => resolve())
  })
}

export default setImmediate
