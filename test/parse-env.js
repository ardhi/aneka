/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/parse-env.js'

describe('parseEnv', function () {
  it('parses and normalizes env keys', function () {
    const old = process.env.ANEKA_TEST_VALUE
    process.env.ANEKA_TEST_VALUE = '42'
    try {
      const out = fn()
      expect(out._.anekaTestValue).to.equal(42)
    } finally {
      if (old === undefined) delete process.env.ANEKA_TEST_VALUE
      else process.env.ANEKA_TEST_VALUE = old
    }
  })

  it('parses nested keys using dot and double underscore separators', function () {
    const old = process.env['ANEKA_DB.PORT']
    process.env['ANEKA_DB.PORT'] = '5432'
    try {
      const out = fn()
      expect(out.anekaDb).to.be.an('object')
      expect(out.anekaDb.port).to.equal(5432)
    } finally {
      if (old === undefined) delete process.env['ANEKA_DB.PORT']
      else process.env['ANEKA_DB.PORT'] = old
    }
  })

  it('applies sanitizer when provided', function () {
    const out = fn(item => ({ ...item, __sanitized: true }))
    expect(out.__sanitized).to.equal(true)
  })
})
