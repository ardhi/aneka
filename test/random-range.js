/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/random-range.js'

describe('randomRange', function () {
  it('returns number and alpha values in expected range', function () {
    const n = fn(1, 3)
    expect(n).to.be.within(1, 3)

    const ch = fn(1, 26, true)
    expect(ch).to.match(/^[a-z]$/)
  })

  it('returns deterministic value when min equals max', function () {
    expect(fn(5, 5)).to.equal(5)
  })

  it('returns expected alpha character when min equals max', function () {
    expect(fn(1, 1, true)).to.equal('a')
  })
})
