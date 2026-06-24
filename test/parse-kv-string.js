/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/parse-kv-string.js'

describe('parseKvString', function () {
  it('parses key-value text into typed object', function () {
    expect(fn('A=1|B=true|C=text')).to.deep.equal({ A: 1, B: true, C: 'text' })
  })

  it('supports custom line delimiters', function () {
    expect(fn('A=1;B=2', true, ';')).to.deep.equal({ A: 1, B: 2 })
  })

  it('respects trimValue=false', function () {
    expect(fn('A=  hello  ', false)).to.deep.equal({ A: '  hello  ' })
  })
})
