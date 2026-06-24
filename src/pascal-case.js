import upperFirst from 'lodash-es/upperFirst.js'
import camelCase from 'lodash-es/camelCase.js'

/**
 * Converts text into PascalCase.
 *
 * @param {string} text Source text.
 * @returns {string} Pascal-cased text.
 */
function pascalCase (text) {
  return upperFirst(camelCase(text))
}

export default pascalCase
