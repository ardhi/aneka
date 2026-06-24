function setProps (properties = {}, options = {}) {
  for (const key in properties) {
    this[key] = properties[key]
  }
  for (const key in options) {
    this[key] = options[key]
  }
}

/**
 * Creates a dynamic class and optionally extends a parent class.
 *
 * @param {string} className Class name hint.
 * @param {Object} [properties={}] Default properties assigned to instances.
 * @param {Function} [parent] Parent class to extend.
 * @returns {Function} Generated class constructor.
 */
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
