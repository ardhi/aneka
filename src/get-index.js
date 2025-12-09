function getIndex (inputs = [], matcher) {
  return indexes = inputs.map((val, idx) => {
    if (matcher(val)) return idx
    return null
  }).filter(val => val !== null)
}

export default getIndex
