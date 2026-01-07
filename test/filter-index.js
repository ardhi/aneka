import { expect } from 'chai'
import fn from '../src/filter-index.js'

describe('filterIndex', function () {
  it('Nothing found', function () {
    const items = [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'three' }
    ]
    const dups = fn(items, item => item.name === 'zero')
    expect(dups).to.have.lengthOf(0)
  })

  it('Found 2 items', function () {
    const items = [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'three' }
    ]
    const dups = fn(items, item => ['one', 'two'].includes(item.name))
    expect(dups).to.eql([0, 1])
  })
})
