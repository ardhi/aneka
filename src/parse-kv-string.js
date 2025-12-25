import dotenvParseVariables from 'dotenv-parse-variables'

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
