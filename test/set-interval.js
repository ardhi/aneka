/* eslint-env mocha */
import { expect } from 'chai'
import lockfile from '@bybrave/proper-lockfile2'
import fs from 'fs-extra'
import fn from '../src/set-interval.js'

const originalSetTimeout = global.setTimeout
const originalClearTimeout = global.clearTimeout
const originalLock = lockfile.lock
const originalEnsureFileSync = fs.ensureFileSync

async function flushMicrotasks (turns = 6) {
  for (let index = 0; index < turns; index++) {
    await Promise.resolve()
  }
}

function installTimerQueue () {
  const queue = []

  global.setTimeout = (callback, ms, ...args) => {
    queue.push({ callback, ms, args })
    return queue.length
  }

  global.clearTimeout = () => {}

  return {
    queue,
    async drainOne () {
      const timer = queue.shift()
      if (!timer) return false
      timer.callback(...timer.args)
      await flushMicrotasks()
      return true
    },
    async drainAll () {
      while (await this.drainOne());
    }
  }
}

function deferred () {
  let resolve
  const promise = new Promise(function (done) {
    resolve = done
  })

  return { promise, resolve }
}

describe('setInterval', function () {
  afterEach(function () {
    global.setTimeout = originalSetTimeout
    global.clearTimeout = originalClearTimeout
    lockfile.lock = originalLock
    fs.ensureFileSync = originalEnsureFileSync
  })

  it('returns a promise and schedules the first execution immediately', async function () {
    const timers = installTimerQueue()
    const result = fn(() => {}, 10)

    expect(result).to.be.instanceOf(Promise)
    await flushMicrotasks()

    expect(timers.queue).to.have.length(1)
    expect(timers.queue[0].ms).to.equal(10)
  })

  it('stops without running the handler when maxIterations is zero', async function () {
    const timers = installTimerQueue()
    const calls = []

    fn(() => calls.push('handler'), '1s', { maxIterations: 0 })
    await flushMicrotasks()

    expect(calls).to.deep.equal([])
    expect(timers.queue).to.have.length(0)
  })

  it('runs the handler the requested number of times', async function () {
    const timers = installTimerQueue()
    const calls = []

    fn(() => calls.push('tick'), 25, { maxIterations: 3 })
    await flushMicrotasks()

    expect(timers.queue).to.have.length(1)
    expect(timers.queue[0].ms).to.equal(25)

    await timers.drainAll()

    expect(calls).to.deep.equal(['tick', 'tick', 'tick'])
    expect(timers.queue).to.have.length(0)
  })

  it('does not schedule the next tick until a long-running handler finishes', async function () {
    const timers = installTimerQueue()
    const calls = []
    const gate = deferred()

    fn(async function () {
      calls.push('start')
      await gate.promise
      calls.push('end')
    }, 25, { maxIterations: 2 })

    await flushMicrotasks()

    expect(calls).to.deep.equal(['start'])
    expect(timers.queue).to.have.length(0)

    gate.resolve()
    await flushMicrotasks()

    expect(calls).to.deep.equal(['start', 'end'])
    expect(timers.queue).to.have.length(1)
    expect(timers.queue[0].ms).to.equal(25)
  })

  it('passes args and scope on each iteration', async function () {
    const timers = installTimerQueue()
    const scope = { total: 0 }

    fn(function (amount) {
      this.total += amount
    }, 5, { args: [2], maxIterations: 2, scope })
    await flushMicrotasks()

    await timers.drainAll()

    expect(scope.total).to.equal(4)
  })

  it('locks and releases around every iteration when a lock file is configured', async function () {
    const timers = installTimerQueue()
    const calls = []
    const ensured = []
    fs.ensureFileSync = lockFile => {
      ensured.push(lockFile)
    }
    lockfile.lock = async (lockFile, lockFileOpts) => {
      calls.push(['lock', lockFile, lockFileOpts])
      return async () => {
        calls.push(['release'])
      }
    }

    fn(() => calls.push(['handler']), 5, {
      lockFile: '/tmp/aneka-set-interval.lock',
      lockFileOpts: { stale: 2000 },
      maxIterations: 2
    })
    await flushMicrotasks()

    await timers.drainAll()

    expect(ensured).to.deep.equal([
      '/tmp/aneka-set-interval.lock',
      '/tmp/aneka-set-interval.lock'
    ])
    expect(calls).to.deep.equal([
      ['lock', '/tmp/aneka-set-interval.lock', { stale: 2000 }],
      ['handler'],
      ['release'],
      ['lock', '/tmp/aneka-set-interval.lock', { stale: 2000 }],
      ['handler'],
      ['release']
    ])
  })

  it('suppresses lock errors when silent is left at the default', async function () {
    const timers = installTimerQueue()
    const calls = []
    const ensured = []
    fs.ensureFileSync = lockFile => {
      ensured.push(lockFile)
    }
    lockfile.lock = async () => {
      throw new Error('lock failed')
    }

    fn(() => calls.push('handler'), 5, {
      lockFile: '/tmp/aneka-set-interval.lock',
      maxIterations: 1
    })
    await flushMicrotasks()

    await timers.drainAll()

    expect(ensured).to.deep.equal(['/tmp/aneka-set-interval.lock'])
    expect(calls).to.deep.equal([])
    expect(timers.queue).to.have.length(0)
  })
})
