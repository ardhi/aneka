/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/create-class.js'

describe('createClass', function () {
  it('creates class with defaults and parent support', function () {
    const A = fn('A', { a: 1 })
    const a = new A({ b: 2 })
    expect(a).to.include({ a: 1, b: 2 })

    class Parent {
      constructor (options = {}) {
        this.p = options.p
      }
    }

    const B = fn('B', { x: true }, Parent)
    const b = new B({ p: 7, y: 'ok' })
    expect(b).to.include({ p: 7, x: true, y: 'ok' })
  })

  it('applies only default properties when no options passed', function () {
    const A = fn('A', { a: 1, b: 2 })
    const a = new A()
    expect(a).to.include({ a: 1, b: 2 })
  })

  it('lets option values override defaults', function () {
    const A = fn('A', { a: 1 })
    const a = new A({ a: 9 })
    expect(a.a).to.equal(9)
  })
})
