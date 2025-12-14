import dotenvParseVariables from 'dotenv-parse-variables'
import { unflatten } from 'flat'
import dotEnv from 'dotenv'
import { each, set, camelCase, forOwn } from 'lodash-es'

const parse = (data, delimiter) => {
  return unflatten(data, {
    delimiter,
    safe: true,
    overwrite: true,
    transformKey: k => {
      return camelCase(k.toLowerCase())
    }
  })
}

const delimiter = '__'
const splitter = '.'

/**
 * Parse environment variables
 *
 * @param {function(Object): Object} [sanitizer] - If provided, result will be sanitized with this function
 * @returns {Object}
 */
function parseEnv (sanitizer) {
  let env
  try {
    env = dotEnv.config({ quiet: true })
  } catch (err) {
  }
  env = dotenvParseVariables(process.env, { assignToProcessEnv: false })
  const all = { _: {} }
  each(env, (v, k) => {
    const parts = k.split(splitter)
    if (!parts[1]) all._[parts[0]] = v
    else set(all, `${camelCase(parts[0])}.${parts[1]}`, v)
  })
  const result = {}
  forOwn(all, (v, k) => {
    result[k] = parse(v, delimiter)
  })
  if (result._.lang) result._.lang = result._.lang.split('.')[0].replaceAll('_', '-')
  return sanitizer ? sanitizer(result) : result
}

export default parseEnv
