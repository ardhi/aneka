/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/parse-args-argv.js'

describe('parseArgsArgv', function () {
  it('parses process argv using parser mode', async function () {
    const original = process.argv
    process.argv = ['node', 'cli.js', '--foo=bar', '--app:key=10']
    try {
      const out = await fn({ useParser: true })
      expect(out.args).to.deep.equal([])
      expect(out.argv._.foo).to.equal('bar')
      expect(out.argv.app.key).to.equal(10)
    } finally {
      process.argv = original
    }
  })

  it('returns positional args in args output', async function () {
    const original = process.argv
    process.argv = ['node', 'cli.js', 'first', 'second']
    try {
      const out = await fn({ useParser: true })
      expect(out.args).to.deep.equal(['first', 'second'])
    } finally {
      process.argv = original
    }
  })

  it('applies sanitizer when provided', async function () {
    const original = process.argv
    process.argv = ['node', 'cli.js', '--foo=bar']
    try {
      const out = await fn({ useParser: true, sanitizer: item => ({ ...item, marked: true }) })
      expect(out.argv.marked).to.equal(true)
    } finally {
      process.argv = original
    }
  })

  it('auto-enables parser mode when --spawn flag exists', async function () {
    const original = process.argv
    process.argv = ['node', 'cli.js', '--spawn=1', '--foo=bar']
    try {
      const out = await fn()
      expect(out.argv._.spawn).to.equal(1)
      expect(out.argv._.foo).to.equal('bar')
    } finally {
      process.argv = original
    }
  })

  it('unflattens hyphenated keys in underscore group', async function () {
    const original = process.argv
    process.argv = ['node', 'cli.js', '--db-host=localhost']
    try {
      const out = await fn({ useParser: true })
      expect(out.argv._.db.host).to.equal('localhost')
    } finally {
      process.argv = original
    }
  })
})
