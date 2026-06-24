/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/defaults-deep.js'

describe('defaultsDeep', function () {
  it('deep merges objects and replaces arrays by first argument priority', function () {
    const out = fn({ a: { b: 1 }, arr: [1] }, { a: { c: 2 }, arr: [2, 3] })
    expect(out).to.deep.equal({ a: { b: 1, c: 2 }, arr: [1] })
  })

  it('returns empty object when no args are given', function () {
    expect(fn()).to.deep.equal({})
  })

  it('merges more than two objects', function () {
    const out = fn({ a: 1 }, { b: 2 }, { c: 3 })
    expect(out).to.deep.equal({ a: 1, b: 2, c: 3 })
  })
})
