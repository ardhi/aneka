/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/text-to-array.js'

describe('textToArray', function () {
  it('removes blank lines and comment-only lines', function () {
    const out = fn('a\n# only comment\n b # keep\n\n c')
    expect(out).to.deep.equal(['a', 'b # keep', 'c'])
  })

  it('trims surrounding spaces from each line', function () {
    expect(fn('  a  \n  b  ')).to.deep.equal(['a', 'b'])
  })

  it('returns empty array when input has only comments and blanks', function () {
    expect(fn('\n# c\n  # d\n')).to.deep.equal([])
  })
})
