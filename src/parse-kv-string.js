import dotenvParseVariables from 'dotenv-parse-variables'

/**
 * Parses key-value text into an object and normalizes primitive types.
 *
 * @param {string} text Input key-value string.
 * @param {boolean} [trimValue=true] Trim value parts.
 * @param {string} [lineDelimiter='|'] Delimiter between lines.
 * @returns {Object} Parsed object.
 */
function parseKvString (text, trimValue = true, lineDelimiter = '|') {
  const lines = text.split(lineDelimiter).join('\n').split('\n')
  const item = {}
  for (const line of lines) {
    const [k, v] = line.split('=')
    item[k.trim()] = trimValue ? v.trim() : v
  }
  return dotenvParseVariables(item, { assignToProcessEnv: false })
}

export default parseKvString
