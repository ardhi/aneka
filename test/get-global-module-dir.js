/* eslint-env mocha */
import { expect } from 'chai'
import path from 'path'
import fn from '../src/get-global-module-dir.js'

const originalPlatformDesc = Object.getOwnPropertyDescriptor(process, 'platform')
const originalExecPathDesc = Object.getOwnPropertyDescriptor(process, 'execPath')
const originalAppData = process.env.APPDATA

function setProcessProp (name, value) {
  Object.defineProperty(process, name, {
    value,
    configurable: true
  })
}

describe('getGlobalModuleDir', function () {
  afterEach(function () {
    if (originalPlatformDesc) Object.defineProperty(process, 'platform', originalPlatformDesc)
    if (originalExecPathDesc) Object.defineProperty(process, 'execPath', originalExecPathDesc)

    if (originalAppData === undefined) delete process.env.APPDATA
    else process.env.APPDATA = originalAppData
  })

  it('returns lib/node_modules for non-win32 platforms', function () {
    setProcessProp('platform', 'linux')
    setProcessProp('execPath', '/opt/node/bin/node')

    const result = fn()
    expect(result).to.equal(path.resolve('/opt/node/lib/node_modules'))
  })

  it('uses APPDATA on win32 when provided', function () {
    setProcessProp('platform', 'win32')
    setProcessProp('execPath', '/Program Files/nodejs/node.exe')
    process.env.APPDATA = '/Users/test/AppData/Roaming'

    const result = fn()
    expect(result).to.equal(path.resolve('/Users/test/AppData/Roaming/npm/node_modules'))
  })

  it('falls back to exec directory on win32 when APPDATA is missing', function () {
    setProcessProp('platform', 'win32')
    setProcessProp('execPath', '/Program Files/nodejs/node.exe')
    delete process.env.APPDATA

    const result = fn()
    expect(result).to.equal(path.resolve('/Program Files/nodejs/node_modules'))
  })
})
