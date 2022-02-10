module.exports = function () {
  return new Promise((resolve) => {
    setImmediate(() => resolve())
  })
}
