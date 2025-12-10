/**
 * Filter array's indexes
 *
 * @param {Array} inputs - Array to filter from
 * @param {Object} matcher - Function to match conditions. If returns ```true```, the running index will be added to the result
 * @returns {Array} Filtered indexes
 */

function filterIndex (inputs, matcher) {
  const indexes = inputs.reduce((accumulator, current, index) => {
    if (matcher(current)) accumulator.push(index)
    return accumulator
  }, [])
  return indexes
}

export default filterIndex
