module.exports = function (array, sep = ', ', lastSep = ' and ') {
  if (array.length < 2) return `${array[0]}`
  const clone = array.slice(0)
  const last = clone.pop()
  return `${clone.join(sep)}${lastSep}${last}`
}