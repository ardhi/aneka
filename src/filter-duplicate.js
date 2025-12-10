/**
 * Filter array of duplicates
 *
 * @param {Array} inputs - Array to filter from. Must be an array of objects
 * @param {string} key - Key's object
 */

function filterDuplicate (inputs, key) {
  const seen = new Set()
  const dups = new Set()

  inputs.forEach(item => {
    const val = item[key]
    if (seen.has(val)) {
      dups.add(val)
    } else {
      seen.add(val)
    }
  })

  return inputs.filter(item => {
    return dups.has(item[key])
  })
}

export default filterDuplicate
