import { expect } from 'chai'
import fn from '../src/parse-kv-string.js'

describe('parseKvString', function () {
  it('Should return the expected result', function () {
    const items = { ONE: 1, TWO: ['one', 'two'] }
    const input = 'ONE=1\nTWO=one,two'
    const result = fn(input)
    expect(result).to.eql(items)
  })
})