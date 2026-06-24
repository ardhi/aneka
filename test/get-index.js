/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/get-index.js'

describe('getIndex', function () {
  it('returns indexes of matching values', function () {
    expect(fn([1, 2, 3, 4], n => n > 2)).to.deep.equal([2, 3])
  })

  it('returns empty array for empty input', function () {
    expect(fn([], () => true)).to.deep.equal([])
  })

  it('returns all indexes when matcher always true', function () {
    expect(fn(['a', 'b'], () => true)).to.deep.equal([0, 1])
  })
})
