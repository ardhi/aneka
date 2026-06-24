/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/round.js'

describe('round', function () {
  it('rounds numeric values with scale', function () {
    expect(fn(1.2345, 2)).to.equal(1.23)
    expect(fn(1.9)).to.equal(2)
  })

  it('uses integer rounding when scale is zero or negative', function () {
    expect(fn(1.49, 0)).to.equal(1)
    expect(fn(1.51, -3)).to.equal(2)
  })

  it('handles negative numbers', function () {
    expect(fn(-1.234, 2)).to.equal(-1.23)
  })
})
