/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/get-caller-filename.js'

describe('getCallerFilename', function () {
  it('returns caller path', function () {
    const got = fn()
    expect(got).to.be.a('string')
    expect(got).to.include('/test/get-caller-filename.js')
  })

  it('returns a stable value on repeated calls', function () {
    const a = fn()
    const b = fn()
    expect(a).to.equal(b)
  })

  it('returns a path ending with js extension', function () {
    const got = fn()
    expect(got.endsWith('.js')).to.equal(true)
  })
})
