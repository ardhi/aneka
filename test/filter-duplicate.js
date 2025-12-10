import { expect } from 'chai'
import fn from '../src/filter-duplicate.js'

describe('filterDuplicate', function () {
  it('No duplication', function () {
    const items = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
      { id: 3, name: "three" }
    ]
    const dups = fn(items, 'name')
    expect(dups).to.have.lengthOf(0)
  })

  it('Two duplications', function () {
    const items = [
      { id: 1, name: "one" },
      { id: 2, name: "one" },
      { id: 3, name: "three" }
    ]
    const dups = fn(items, 'name')
    expect(dups).to.have.lengthOf(2)
  })
})