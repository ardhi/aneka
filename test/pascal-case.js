/* eslint-env mocha */
import { expect } from 'chai'
import fn from '../src/pascal-case.js'

describe('pascalCase', function () {
  it('converts text to PascalCase', function () {
    expect(fn('hello world')).to.equal('HelloWorld')
  })

  it('handles snake and kebab case input', function () {
    expect(fn('hello_world')).to.equal('HelloWorld')
    expect(fn('hello-world')).to.equal('HelloWorld')
  })

  it('handles already-camelized input', function () {
    expect(fn('helloWorld')).to.equal('HelloWorld')
  })
})
