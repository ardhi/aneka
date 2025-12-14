import { expect } from 'chai'
import fn from '../src/parse-object.js'

describe('parseObjecy', function () {
  it('Should return the expected result', function () {
    const items = { _: { log: { pretty: true, level: 'trace' }, lang: 'id' } }
    const result = fn(items, { parseValue: true })
    expect(result).to.eql(items)
  })
})