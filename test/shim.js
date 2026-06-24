/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/shim.js'

describe('shim', function () {
  it('adds splice polyfill when missing', function () {
    const oldSplice = String.prototype.splice
    delete String.prototype.splice
    try {
      fn()
      expect('abcd'.splice(1, 2, 'X')).to.equal('aXd')
    } finally {
      if (oldSplice) String.prototype.splice = oldSplice
      else delete String.prototype.splice
    }
  })

  it('can add replaceAll polyfill when missing', function () {
    const oldReplaceAll = String.prototype.replaceAll
    delete String.prototype.replaceAll
    try {
      fn()
      expect('abca'.replaceAll('a', 'x')).to.equal('xbcx')
    } finally {
      if (oldReplaceAll) String.prototype.replaceAll = oldReplaceAll
      else delete String.prototype.replaceAll
    }
  })

  it('can be called repeatedly without throwing', function () {
    expect(() => fn()).to.not.throw()
    expect(() => fn()).to.not.throw()
  })
})
