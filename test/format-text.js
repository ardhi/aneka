/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/format-text.js'

describe('formatText', function () {
  it('applies sprintf and modifiers', function () {
    expect(fn('hello %s', 'world')).to.equal('hello world')
    expect(fn('Collected %s|toLower|upperFirst', 'iTeMs')).to.equal('Collected Items')
  })

  it('works as plain sprintf when no modifiers are present', function () {
    expect(fn('Total: %d', 10)).to.equal('Total: 10')
  })

  it('keeps escaped percent literals', function () {
    expect(fn('Progress %% %d', 50)).to.equal('Progress % 50')
  })

  it('supports multiple modifiers in sequence', function () {
    expect(fn('Name: %s|trim|pascalCase', '  hello world  ')).to.equal('Name: HelloWorld')
  })

  it('supports secToHms modifier for duration values', function () {
    expect(fn('Elapsed %s|secToHms', 61)).to.equal('Elapsed 01:01')
  })
})
