/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/get-key-by-value.js'

describe('getKeyByValue', function () {
  it('returns key by matching value', function () {
    expect(fn({ a: 1, b: 2 }, 2)).to.equal('b')
  })

  it('returns undefined when no value is found', function () {
    expect(fn({ a: 1 }, 9)).to.equal(undefined)
  })

  it('returns first matching key when values are duplicated', function () {
    expect(fn({ a: 1, b: 1 }, 1)).to.equal('a')
  })
})
