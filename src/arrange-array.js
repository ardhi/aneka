import trim from 'lodash-es/trim.js'

function arrangeArray (inputs = [], trimItem = true) {
  const first = []
  const last = []

  const items = inputs.filter(item => {
    if (trimItem) item = trim(item)
    if (item[0] === '^') first.push(item.slice(1))
    else if (item[0] === '$') last.push(item.slice(1))
    return !['^', '$'].includes(item[0])
  })
  items.unshift(...first)
  items.push(...last)
  return items
}

export default arrangeArray
