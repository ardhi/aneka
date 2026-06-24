import isSet from './is-set.js'
import parseDuration from './parse-duration.js'
import dotenvParseVariables from 'dotenv-parse-variables'
import { set, isString, cloneDeep, isPlainObject, isArray, omit } from 'lodash-es'

/**
 * Parses an object (or JSON string) and recursively normalizes nested values.
 *
 * When `options.parseValue` is enabled, string values are converted using
 * dotenv-parse-variables rules (for example booleans, numbers, arrays, and null),
 * including values inside arrays and nested objects.
 *
 * Special key handling:
 * - Keys ending with `Dur` are converted to milliseconds using parseDuration.
 * - Keys ending with `Dt` are converted to Unix timestamps using Date.parse.
 * - `options.translator` can translate prefixed keys/values before normalization.
 *
 * @param {(Object|string)} input If string is given, parse it first using JSON.parse.
 * @param {Object} [options={}] Options.
 * @param {boolean} [options.silent=true] If `true`, parsing errors are ignored and values become undefined.
 * @param {boolean} [options.parseValue=false] If `true`, values are parsed and normalized.
 * @param {Object} [options.translator] Optional translator config for prefixed keys/values.
 * @returns {Object} Parsed and normalized object.
 * @see {@link https://github.com/ladjs/dotenv-parse-variables}
 */
function parseObject (input, options = {}) {
  const { silent = true, parseValue = false, translator = {} } = options
  const { prefix, lang, handler } = translator
  const statics = ['*']
  if (isString(input)) {
    try {
      input = JSON.parse(input)
    } catch (err) {
      if (silent) input = {}
      else throw err
    }
  }
  let obj = cloneDeep(input)
  const keys = Object.keys(obj)
  const mutated = []
  keys.forEach(k => {
    let v = obj[k]
    if (isPlainObject(v)) obj[k] = parseObject(v, options)
    else if (isArray(v)) {
      v.forEach((i, idx) => {
        if (isPlainObject(i)) obj[k][idx] = parseObject(i, options)
        else if (statics.includes(i)) obj[k][idx] = i
        else if (parseValue) obj[k][idx] = dotenvParseVariables(set({}, 'item', obj[k][idx]), { assignToProcessEnv: false }).item
        if (isArray(obj[k][idx])) obj[k][idx] = obj[k][idx].map(item => typeof item === 'string' ? item.trim() : item)
      })
    } else if (isSet(v)) {
      if (isString(v) && prefix && lang && handler && v.startsWith(prefix)) v = handler(v.slice(prefix.length))
      try {
        if (statics.includes(v)) obj[k] = v
        else if (isString(v) && prefix && handler && k.startsWith(prefix)) {
          const newK = k.slice(prefix.length)
          if (lang) obj[newK] = handler(v)
          else obj[newK] = v
          mutated.push(k)
        } else if (parseValue) {
          obj[k] = dotenvParseVariables(set({}, 'item', v), { assignToProcessEnv: false }).item
          if (isArray(obj[k])) obj[k] = obj[k].map(item => typeof item === 'string' ? item.trim() : item)
        }
        if (k.slice(-3) === 'Dur') obj[k] = parseDuration(v)
        if (k.slice(-2) === 'Dt') obj[k] = Date.parse(v)
      } catch (err) {
        obj[k] = undefined
        if (!silent) throw err
      }
    }
  })
  if (mutated.length > 0) obj = omit(obj, mutated)
  return obj
}

export default parseObject
