import upperFirst from 'lodash-es/upperFirst.js'
import camelCase from 'lodash-es/camelCase.js'

function pascalCase (text) {
  return upperFirst(camelCase(text))
}

export default pascalCase
