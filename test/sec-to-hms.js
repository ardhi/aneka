/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/sec-to-hms.js'

describe('secToHms', function () {
  it('formats seconds and milliseconds', function () {
    expect(fn(61)).to.equal('01:01')
    expect(fn(12345, true)).to.equal('00:12+345')
  })

  it('includes hours for long durations', function () {
    expect(fn(3661)).to.equal('01:01:01')
  })

  it('formats zero as 00:00', function () {
    expect(fn(0)).to.equal('00:00')
  })
})
