const fg = require('fast-glob')
const { map, filter, isFunction } = require('lodash')
const path = require('path')

const stripExt = file => {
  const parts = path.parse(file)
  return parts.dir + '/' + parts.name
}

module.exports = async function (dir, transformer, options = {}) {
  if (!dir) throw new Error('Directory is missing')
  if (!transformer) throw new Error('Transformer is missing')
  const files = await fg(dir + '/*.{json,js}', options.glob)
  const strippeds = map(files, f => stripExt(f))
  const result = []
  for (const file of files) {
    const stripped = stripExt(file)
    if (filter(strippeds, f => f === stripped).length > 1) throw new (`File '${stripped}.{json,js}' already used`)
    try {
      let mod = require(file)
      if (isFunction(mod)) mod = await mod(options.module)
      result.push(await transformer(file, mod, options.transformer))
    } catch (err) {
      throw err
    }
  }
  return result
}
