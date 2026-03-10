import isEmpty from 'lodash-es/isEmpty.js'

function textToArray (text) {
  const lines = text.trim().split('\n').map(line => line.trim())
  return lines.filter(c => {
    const line = c.split('#')[0].trim()
    return !isEmpty(line)
  })
}

export default textToArray
