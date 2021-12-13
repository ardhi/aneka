module.exports = (msg, terminate, method = 'log') => {
  if (method === true) method = 'log'
  console[method](msg)
  if (terminate) process.exit(1)
}
