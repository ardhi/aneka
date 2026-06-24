/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/paginate.js'

describe('paginate', function () {
  it('returns sorted paginated result with metadata', function () {
    const out = fn([{ n: 2 }, { n: 1 }, { n: 3 }], { page: 1, limit: 2, sort: { n: 1 } })
    expect(out.data).to.deep.equal([{ n: 1 }, { n: 2 }])
    expect(out.count).to.equal(3)
    expect(out.pages).to.equal(2)
  })

  it('uses default options when omitted', function () {
    const out = fn([{ n: 1 }])
    expect(out.page).to.equal(1)
    expect(out.limit).to.equal(25)
    expect(out.data).to.deep.equal([{ n: 1 }])
  })

  it('supports descending sort order', function () {
    const out = fn([{ n: 1 }, { n: 3 }, { n: 2 }], { sort: { n: -1 } })
    expect(out.data.map(i => i.n)).to.deep.equal([3, 2, 1])
  })
})
