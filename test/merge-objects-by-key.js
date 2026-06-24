/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/merge-objects-by-key.js'

describe('mergeObjectsByKey', function () {
  it('merges object entries sharing same key', function () {
    const out = fn([{ id: 1, a: 1 }, { id: 1, b: 2 }, { id: 2, c: 3 }], 'id')
    expect(out).to.deep.equal([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3 }])
  })

  it('returns empty array for empty input', function () {
    expect(fn([], 'id')).to.deep.equal([])
  })

  it('keeps single items unchanged', function () {
    const input = [{ id: 7, x: true }]
    expect(fn(input, 'id')).to.deep.equal(input)
  })
})
