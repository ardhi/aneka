import { parseObject } from '../index.js'
import isSet from './is-set.js'
import parseDuration from './parse-duration.js'
import dotenvParseVariables from 'dotenv-parse-variables'
import { set, isString, cloneDeep, isPlainObject, isArray, omit } from 'lodash-es'

/**
 * Parse an object and optionally normalize its values recursively. Use {@link https://github.com/ladjs/dotenv-parse-variables}
 * to parse values, so please have a visit to know how it works
 *
 * If ```options.parseValue``` is ```true```, any key ends with ```Dur``` and ```Dt``` will
 * also be parsed as millisecond and Javascript date time accordingly.
 *
 * @param {(Object|string)} input - If string is given, parse it first using JSON.parse
 * @param {Object} [options={}] - Options
 * @param {boolean} [options.silent=true] - If ```true``` (default), exception are not thrown and silently ignored
 * @param {boolean} [options.parseValue=false] - If ```true```, values will be parsed & normalized
 * @param {function(string): string} [options.translator] - If provided, translate string value with this function
 * @returns {Object}
 * @see {@link https://github.com/ladjs/dotenv-parse-variables}
 */
function parseObject (input, options = {}) {
  const { silent = true, parseValue = false, translate } = options
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
      if (isString(v) && translate) v = translate(v.slice(2))
      try {
        if (statics.includes(v)) obj[k] = v
        else if (k.startsWith('t:') && isString(v)) {
          const newK = k.slice(2)
          if (translate) obj[newK] = translate(v)
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
