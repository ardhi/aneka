/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/delay.js'

describe('delay', function () {
  it('resolves after timeout', async function () {
    await fn(1)
  })

  it('returns a promise', function () {
    expect(fn(1)).to.be.an.instanceof(Promise)
  })

  it('works with default timeout argument', async function () {
    await fn()
  })
})
