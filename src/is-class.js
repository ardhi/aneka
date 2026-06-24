/**
 * Checks whether a value appears to be a class constructor.
 *
 * @param {any} item Value to test.
 * @returns {boolean} True when item is class-like.
 */
function isClass (item) {
  return typeof item === 'function' &&
    Object.prototype.hasOwnProperty.call(item, 'prototype') &&
    !Object.prototype.hasOwnProperty.call(item, 'arguments')
}

export default isClass
