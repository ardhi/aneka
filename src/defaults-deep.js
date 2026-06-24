import mergeWith from 'lodash-es/mergeWith.js'
import isArray from 'lodash-es/isArray.js'

/**
 * Deep-merges objects while replacing arrays from higher-priority inputs.
 *
 * @param {...Object} args Objects to merge.
 * @returns {Object} Merged object.
 */
function defaultsDeep (...args) {
  const output = {}
  args.reverse().forEach(function (item) {
    mergeWith(output, item, function (objectValue, sourceValue) {
      return isArray(sourceValue) ? sourceValue : undefined
    })
  })
  return output
}

export default defaultsDeep
