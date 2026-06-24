/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/set-immediate.js'

describe('setImmediate', function () {
  it('exports a callable function', function () {
    expect(fn).to.be.a('function')
  })

  it('takes no required parameters', function () {
    expect(fn.length).to.equal(0)
  })

  it('is declared as async function', function () {
    expect(fn.constructor.name).to.equal('AsyncFunction')
  })
})
