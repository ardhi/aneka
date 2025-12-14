import { sprintf } from 'sprintf-js'
import pascalCase from './pascal-case.js'
import secToHms from './sec-to-hms.js'
import {
  camelCase,
  capitalize,
  escape,
  kebabCase,
  toLower,
  toUpper,
  lowerFirst,
  upperFirst,
  snakeCase,
  startCase,
  trim,
  unescape,
  keys,
  find
} from 'lodash-es'

const modifier = {
  camelCase,
  capitalize,
  escape,
  kebabCase,
  toLower,
  toUpper,
  lowerFirst,
  upperFirst,
  snakeCase,
  startCase,
  trim,
  unescape,
  pascalCase,
  secToHms
}

const modifiers = keys(modifier)

const pipe = '|'
const tokens = ['b', 'c', 'd', 'i', 'e', 'u', 'f', 'g', 'o', 's', 't', 'T', 'v', 'x', 'X', 'j']

/**
 * Format text according using sprintf with extra ability to run its arguments through a serie of modifiers
 * Modifier must be place right after a token prepended with pipe ``|``` symbols.
 * You can put as many mofifiers as you want.
 *
 * E.g:
 * ```javascript
 * const text = 'Collected %s|toLower|upperFirst: %d'
 * const result = this.app.lib.formatText(text, 'iTeMs', 10)
 * console.log(result) // Collected Items: 10
 * ```
 *
 * @param {string} text - Text to be formatted
 * @param  {...any} args - Argumennts
 * @returns {string} Formatted text
 */
function formatText (text, ...args) {
  if (!text.includes(pipe)) return sprintf(text, ...args)
  const items = text.split('%')
  let newText = text.replaceAll('%%', '\t\t')
  const newArgs = ['', ...args]
  for (const idx in items) {
    const item = items[idx]
    if (tokens.includes(item[0])) {
      const parts = item.split(pipe)
      parts.shift()
      for (const part of parts) {
        let mod = modifier[part]
        if (!mod) {
          const fn = find(modifiers, name => part.slice(0, name.length) === name)
          if (fn) mod = modifier[fn]
        }
        if (mod) newArgs[idx] = mod(newArgs[idx])
      }
    }
  }
  newText = newText.replaceAll('\t\t', '%%')
  for (const key of keys(modifier)) {
    newText = newText.replaceAll(`${pipe}${key}`, '')
  }
  newText = newText.replace(pipe, '')
  newArgs.shift()
  return sprintf(newText, ...newArgs)
}

export default formatText
