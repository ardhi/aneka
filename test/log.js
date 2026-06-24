/* eslint-env mocha */
import { expect } from 'chai'
import { log, logError } from '../src/log.js'

describe('log', function () {
  it('calls console log and console error', function () {
    const originalLog = console.log
    const originalError = console.error
    const logs = []
    const errors = []
    console.log = (...args) => logs.push(args)
    console.error = (...args) => errors.push(args)
    try {
      log('Hello %s', 'world')
      logError('Oops %s', 'x')
      expect(logs.length).to.equal(1)
      expect(errors.length).to.equal(1)
    } finally {
      console.log = originalLog
      console.error = originalError
    }
  })

  it('passes non-string items directly to console.log', function () {
    const originalLog = console.log
    const logs = []
    console.log = (...args) => logs.push(args)
    try {
      log({ a: 1 })
      expect(logs[0][0]).to.deep.equal({ a: 1 })
    } finally {
      console.log = originalLog
    }
  })

  it('formats string labels with timestamp prefix', function () {
    const originalLog = console.log
    const logs = []
    console.log = (...args) => logs.push(args)
    try {
      log('Value %d', 7)
      expect(logs[0][0]).to.match(/^\[[^\]]+\] Value 7$/)
    } finally {
      console.log = originalLog
    }
  })
})
