/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/is-set.js'

describe('isSet', function () {
  it('returns true for non-null and non-undefined values', function () {
    expect(fn(0)).to.equal(true)
    expect(fn(null)).to.equal(false)
    expect(fn(undefined)).to.equal(false)
  })

  it('returns true for empty strings and false booleans', function () {
    expect(fn('')).to.equal(true)
    expect(fn(false)).to.equal(true)
  })

  it('returns true for empty arrays and objects', function () {
    expect(fn([])).to.equal(true)
    expect(fn({})).to.equal(true)
  })
})
