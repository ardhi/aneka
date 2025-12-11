import { expect } from 'chai'
import fn from '../src/merge-objects-by-key.js'

describe('mergeObjectsByKey', function () {
  it('Should return the expected result', function () {
    const items = [
      { id: 1, name: 'Apple', count: 1 },
      { id: 2, name: 'Banana', count: 2 },
      { id: 1, color: 'Red', price: 0.99 },
      { id: 3, name: 'Cherry', count: 5 },
      { id: 2, color: 'Yellow', weight: '100g' }
    ]
    const expected = [
      { id: 1, name: 'Apple', count: 1, color: 'Red', price: 0.99 },
      { id: 2, name: 'Banana', count: 2, color: 'Yellow', weight: '100g' },
      { id: 3, name: 'Cherry', count: 5 }
    ]
    const result = fn(items, 'id')
    expect(result).to.eql(expected)
  })
})