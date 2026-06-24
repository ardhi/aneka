/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/extract-text.js'

describe('extractText', function () {
  it('extracts text between markers', function () {
    expect(fn('a [x] b', '[', ']')).to.deep.equal({ result: 'x', pattern: '[x]' })
  })

  it('returns empty result when start marker is missing', function () {
    expect(fn('a x b', '[', ']')).to.deep.equal({ result: '', pattern: '[]' })
  })

  it('returns empty result when end marker is missing', function () {
    expect(fn('a [x b', '[', ']')).to.deep.equal({ result: '', pattern: '[]' })
  })
})
