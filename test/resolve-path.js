/* eslint-env mocha */
import { expect } from 'chai'
import path from 'path'
import fn from '../src/resolve-path.js'

describe('resolvePath', function () {
  it('resolves paths and can return file URL', function () {
    const resolved = fn('./src/../src/round.js')
    expect(path.isAbsolute(resolved)).to.equal(true)
    const asUrl = fn('./src/round.js', true)
    expect(asUrl.startsWith('file:///')).to.equal(true)
  })

  it('resolves file urls back to absolute paths', function () {
    const pathValue = fn('file:///tmp/example.txt')
    expect(path.isAbsolute(pathValue)).to.equal(true)
  })

  it('returns absolute path for relative input', function () {
    expect(path.isAbsolute(fn('./README.md'))).to.equal(true)
  })
})
