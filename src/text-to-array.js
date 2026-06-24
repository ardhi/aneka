import isEmpty from 'lodash-es/isEmpty.js'

/**
 * Converts multiline text into a cleaned array and removes comments.
 *
 * @param {string} text Input text.
 * @returns {Array<string>} Cleaned lines.
 */
function textToArray (text) {
  const lines = text.trim().split('\n').map(line => line.trim())
  return lines.filter(c => {
    const line = c.split('#')[0].trim()
    return !isEmpty(line)
  })
}

export default textToArray
