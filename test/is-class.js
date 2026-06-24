/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/is-class.js'

describe('isClass', function () {
  it('identifies class constructors', function () {
    class C {}
    expect(fn(C)).to.equal(true)
    expect(fn(() => {})).to.equal(false)
  })

  it('returns false for plain objects', function () {
    expect(fn({})).to.equal(false)
  })

  it('returns false for null values', function () {
    expect(fn(null)).to.equal(false)
  })
})
