/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/filter-index.js'

describe('filterIndex', function () {
  it('returns indexes matching predicate', function () {
    expect(fn([1, 2, 3, 4], n => n % 2 === 0)).to.deep.equal([1, 3])
  })

  it('returns empty array when no items match', function () {
    expect(fn([1, 3, 5], n => n % 2 === 0)).to.deep.equal([])
  })

  it('returns all indexes when all items match', function () {
    expect(fn([2, 4], n => n % 2 === 0)).to.deep.equal([0, 1])
  })
})
