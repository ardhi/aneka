/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/without.js'

describe('without', function () {
  it('removes provided and empty-like values', function () {
    expect(fn([1, 2, null, '', 3, undefined], 2)).to.deep.equal([1, 3])
  })

  it('removes null, undefined and empty string by default', function () {
    expect(fn([null, undefined, '', 'x'])).to.deep.equal(['x'])
  })

  it('returns empty array for empty input', function () {
    expect(fn([])).to.deep.equal([])
  })
})
