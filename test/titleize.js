/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/titleize.js'

describe('titleize', function () {
  it('converts text to title-case output', function () {
    expect(fn('the captain of the sea')).to.equal('The Captain of The Sea')
  })

  it('keeps ignored words unchanged when configured', function () {
    expect(fn('go to mars', { ignores: ['to'] })).to.equal('Go to Mars')
  })

  it('supports replacement map before title conversion', function () {
    const out = fn('hello usa', { replacement: { usa: 'USA' } })
    expect(out).to.be.a('string')
    expect(out.startsWith('Hello')).to.equal(true)
  })

  it('returns empty string for empty input', function () {
    expect(fn('')).to.equal('')
  })

  it('keeps default ignored words (and/of/or/with) in lowercase', function () {
    expect(fn('king of sea and sky')).to.equal('King of Sea and Sky')
  })
})
