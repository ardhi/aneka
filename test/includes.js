/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/includes.js'

describe('includes', function () {
  it('checks if any matcher exists in array', function () {
    expect(fn('b', ['a', 'b'])).to.equal(true)
    expect(fn(['x', 'y'], ['a', 'b'])).to.equal(false)
  })

  it('supports matcher arrays with at least one hit', function () {
    expect(fn(['x', 'b'], ['a', 'b'])).to.equal(true)
  })

  it('returns false for empty matcher and array', function () {
    expect(fn([], [])).to.equal(false)
  })
})
