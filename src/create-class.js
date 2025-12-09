function setProps (properties = {}, options = {}) {
  for (const key in properties) {
    this[key] = properties[key]
  }
  for (const key in options) {
    this[key] = options[key]
  }
}

function createClass (className, properties = {}, parent) {
  let cls = class {
    constructor (...options) {
      setProps.call(this, properties, ...options)
    }
  }
  if (parent) {
    cls = class extends parent {
      constructor (options) {
        super(options)
        setProps.call(this, properties, options)
      }
    }
  }
  return cls
}

export default createClass
