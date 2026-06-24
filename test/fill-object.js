/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/fill-object.js'

describe('fillObject', function () {
  it('fills requested keys with default values', function () {
    expect(fn({ a: 1 }, ['a', 'b'], 0)).to.deep.equal({ a: 1, b: 0 })
  })

  it('treats null and undefined as missing values', function () {
    expect(fn({ a: null, b: undefined }, ['a', 'b'], 'x')).to.deep.equal({ a: 'x', b: 'x' })
  })

  it('returns empty object when key list is empty', function () {
    expect(fn({ a: 1 }, [], 0)).to.deep.equal({})
  })
})
