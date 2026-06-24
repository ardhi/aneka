/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/filter-duplicate.js'

describe('filterDuplicate', function () {
  it('returns duplicated object entries', function () {
    const rows = [{ n: 'a' }, { n: 'b' }, { n: 'a' }]
    expect(fn(rows, 'n')).to.deep.equal([{ n: 'a' }, { n: 'a' }])
  })

  it('returns empty array when no duplication exists', function () {
    expect(fn([{ n: 'a' }, { n: 'b' }], 'n')).to.deep.equal([])
  })

  it('returns all entries participating in duplicated keys', function () {
    const rows = [{ n: 'a' }, { n: 'b' }, { n: 'a' }, { n: 'b' }]
    expect(fn(rows, 'n')).to.deep.equal(rows)
  })
})
