function getCallerFilename () {
  const originalFunc = Error.prepareStackTrace
  let callerfile

  try {
    const err = new Error()
    Error.prepareStackTrace = (_, stack) => stack
    const currentfile = err.stack.shift().getFileName()

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName()
      if (currentfile !== callerfile) break
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc
  return callerfile
}

export default getCallerFilename
