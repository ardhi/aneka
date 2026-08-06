/* eslint-env mocha */
import { expect } from 'chai'
import lockfile from '@bybrave/proper-lockfile2'
import fn from '../src/set-timeout.js'

const originalSetTimeout = global.setTimeout
const originalClearTimeout = global.clearTimeout
const originalLock = lockfile.lock

function installTimerMock () {
  const calls = []

  global.setTimeout = (callback, ms, ...args) => {
    calls.push({ callback, ms, args })
    queueMicrotask(() => callback(...args))
    return calls.length
  }

  global.clearTimeout = () => {}

  return calls
}

describe('setTimeout', function () {
  afterEach(function () {
    global.setTimeout = originalSetTimeout
    global.clearTimeout = originalClearTimeout
    lockfile.lock = originalLock
  })

  it('returns a promise and resolves after the parsed timeout', async function () {
    const timerCalls = installTimerMock()
    const calls = []

    const result = fn(() => calls.push('done'), '2s')

    expect(result).to.be.instanceOf(Promise)
    await result

    expect(timerCalls).to.have.length(1)
    expect(timerCalls[0].ms).to.equal(2000)
    expect(calls).to.deep.equal(['done'])
  })

  it('passes args to the handler', async function () {
    installTimerMock()
    const calls = []

    await fn((a, b, c) => calls.push([a, b, c]), 1, { args: [1, 'two', true] })

    expect(calls).to.deep.equal([[1, 'two', true]])
  })

  it('binds the provided scope to the handler', async function () {
    installTimerMock()
    const scope = { value: 0 }

    await fn(function (step) {
      this.value += step
    }, 1, { args: [3], scope })

    expect(scope.value).to.equal(3)
  })

  it('locks and releases the lock file around the handler', async function () {
    installTimerMock()
    const calls = []
    lockfile.lock = async (lockFile, lockFileOpts) => {
      calls.push(['lock', lockFile, lockFileOpts])
      return async () => {
        calls.push(['release'])
      }
    }

    await fn(() => calls.push(['handler']), 1, {
      lockFile: '/tmp/aneka-set-timeout.lock',
      lockFileOpts: { stale: 1000 }
    })

    expect(calls).to.deep.equal([
      ['lock', '/tmp/aneka-set-timeout.lock', { stale: 1000 }],
      ['handler'],
      ['release']
    ])
  })

  it('suppresses lock errors when silent is left at the default', async function () {
    installTimerMock()
    const calls = []
    lockfile.lock = async () => {
      throw new Error('lock failed')
    }

    await fn(() => calls.push('handler'), 1, {
      lockFile: '/tmp/aneka-set-timeout.lock'
    })

    expect(calls).to.deep.equal([])
  })

  it('rethrows lock errors when silent is false', async function () {
    installTimerMock()
    const error = new Error('lock failed')
    lockfile.lock = async () => {
      throw error
    }

    let thrown
    try {
      await fn(() => {}, 1, {
        lockFile: '/tmp/aneka-set-timeout.lock',
        silent: false
      })
    } catch (err) {
      thrown = err
    }

    expect(thrown).to.equal(error)
  })
})
