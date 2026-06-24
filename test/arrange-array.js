/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/arrange-array.js'

describe('arrangeArray', function () {
  it('returns items in original order when no prefix markers are used', function () {
    expect(fn(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c'])
  })

  it('moves ^ prefixed items to the front', function () {
    expect(fn(['a', '^b', 'c'])).to.deep.equal(['b', 'a', 'c'])
  })

  it('moves $ prefixed items to the end', function () {
    expect(fn(['a', '$b', 'c'])).to.deep.equal(['a', 'c', 'b'])
  })

  it('handles both ^ and $ prefixed items in the same array', function () {
    expect(fn(['a', '^b', '$c', 'd'])).to.deep.equal(['b', 'a', 'd', 'c'])
  })

  it('preserves order of multiple ^ prefixed items', function () {
    expect(fn(['^a', '^b', 'c'])).to.deep.equal(['a', 'b', 'c'])
  })

  it('preserves order of multiple $ prefixed items', function () {
    expect(fn(['a', '$b', '$c'])).to.deep.equal(['a', 'b', 'c'])
  })

  it('trims items to detect prefix markers but returns original values for non-prefix items', function () {
    expect(fn(['  a  ', '  ^b  ', '  c  '])).to.deep.equal(['b', '  a  ', '  c  '])
  })

  it('does not detect prefix when trimItem is false and item has leading whitespace', function () {
    expect(fn(['  a  ', '  ^b  '], false)).to.deep.equal(['  a  ', '  ^b  '])
  })

  it('returns an empty array for empty input', function () {
    expect(fn([])).to.deep.equal([])
  })
})
