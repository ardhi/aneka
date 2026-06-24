/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/parse-duration.js'

describe('parseDuration', function () {
  it('converts duration strings and keeps numbers as is', function () {
    expect(fn('1s')).to.equal(1000)
    expect(fn(123)).to.equal(123)
  })

  it('converts minute values correctly', function () {
    expect(fn('2m')).to.equal(120000)
  })

  it('returns undefined for invalid duration text', function () {
    expect(fn('not-a-duration')).to.equal(undefined)
  })
})
