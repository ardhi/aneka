/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/parse-object.js'

describe('parseObject', function () {
  it('parses nested values recursively', function () {
    const out = fn({ num: '1', nested: { ok: 'true' }, ttlDur: '2s' }, { parseValue: true })
    expect(out.num).to.equal(1)
    expect(out.nested.ok).to.equal(true)
    expect(out.ttlDur).to.equal(2000)
  })

  it('accepts JSON string input', function () {
    const out = fn('{"enabled":"true","count":"2"}', { parseValue: true })
    expect(out).to.deep.equal({ enabled: true, count: 2 })
  })

  it('throws invalid json when silent is false', function () {
    expect(() => fn('{ bad', { silent: false })).to.throw()
  })

  it('returns empty object for invalid json when silent is true', function () {
    expect(fn('{ bad', { silent: true })).to.deep.equal({})
  })

  it('keeps static wildcard values unchanged', function () {
    const out = fn({ marker: '*', nested: { marker: '*' } }, { parseValue: true })
    expect(out).to.deep.equal({ marker: '*', nested: { marker: '*' } })
  })
})
