/* eslint-env mocha */
import { expect } from 'chai'
import path from 'path'
import fn from '../src/current-loc.js'

describe('currentLoc', function () {
  it('returns directory and filename aliases', function () {
    const info = fn(import.meta)
    expect(info).to.have.keys(['dir', 'file', '__dirname', '__filename'])
    expect(path.basename(info.dir)).to.equal('test')
    expect(info.file).to.include('/test/current-loc.js')
  })

  it('keeps alias values in sync', function () {
    const info = fn(import.meta)
    expect(info.dir).to.equal(info.__dirname)
    expect(info.file).to.equal(info.__filename)
  })

  it('returns absolute file path', function () {
    const info = fn(import.meta)
    expect(path.isAbsolute(info.file)).to.equal(true)
  })
})
