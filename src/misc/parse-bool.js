module.exports = function (input = '', caseInsensitive = false) {
  const falsy = ['0', '0n', 'null', 'undefined', 'false', 'NaN', '']
  if (caseInsensitive) input = input.toLowerCase()
  return !falsy.includes(input)
}
