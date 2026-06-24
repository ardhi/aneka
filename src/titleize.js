import forOwn from 'lodash-es/forOwn.js'
import map from 'lodash-es/map.js'
import words from 'lodash-es/words.js'
import uniq from 'lodash-es/uniq.js'
import concat from 'lodash-es/concat.js'
import upperFirst from 'lodash-es/upperFirst.js'
import generateId from './generate-id.js'

/**
 * Converts text to title case with optional ignore and replacement rules.
 *
 * @param {string} [text=''] Source text.
 * @param {Object} [options={}] Transformation options.
 * @param {Array<string>} [options.ignores=[]] Words that should remain unchanged.
 * @param {Object<string, string>} [options.replacement={}] Exact token replacements.
 * @returns {string} Titleized text.
 */
function titleize (text = '', options = {}) {
  let { ignores = [], replacement = {} } = options
  const defIgnores = ['or', 'and', 'of', 'with']
  const replacer = {}
  forOwn(replacement, (v, k) => {
    const id = generateId()
    replacer[id] = k
    text = text.replace(k, ` ${id} `)
  })
  return map(words(text), t => {
    forOwn(replacer, (v, k) => {
      if (k === t) t = replacement[replacer[k]]
    })
    ignores = uniq(concat(ignores, defIgnores))
    if (ignores.includes(t)) return t
    return upperFirst(t)
  }).join(' ')
}

export default titleize
