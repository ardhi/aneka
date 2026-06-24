/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/generate-id.js'

describe('generateId', function () {
  it('generates ids based on options', function () {
    const id = fn()
    expect(id).to.be.a('string')
    expect(id).to.have.lengthOf(13)

    const alpha = fn('alpha')
    expect(alpha).to.match(/^[a-zA-Z]+$/)

    const intVal = fn('int')
    expect(intVal).to.be.a('number')
  })

  it('supports lower and upper case options', function () {
    expect(fn({ case: 'lower' })).to.match(/^[a-z0-9]+$/)
    expect(fn({ case: 'upper' })).to.match(/^[A-Z0-9]+$/)
  })

  it('returns generator instance when requested', function () {
    const inst = fn({ returnInstance: true })
    expect(inst).to.be.a('function')
    expect(inst()).to.be.a('string')
  })
})
