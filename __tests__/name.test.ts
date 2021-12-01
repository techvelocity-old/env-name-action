import {trim, generate} from '../src/name'
import {expect, it, describe} from '@jest/globals'

describe('trim', () => {
  it('trims only if needed', () => {
    const str = 'not-long'
    expect(trim(str, 20)).toBe(str)
  })

  it('trims', () => {
    const str = 'very-very-long'
    expect(trim(str, 8)).toBe('very-ver')
  })

  it('does not end with dash', () => {
    expect(trim('ends-dash-------', 5)).toBe('ends')
    expect(trim('ends-dash-------', 6)).toBe('ends-d')
  })
})

describe('generate', () => {
  it('throws an error if no {name} is present', () => {
    expect(() => {
      generate('name', 'bad-pattern-{name', 10)
    }).toThrowError('missing {name} inside the pattern')
  })

  it('changes to dashes', () => {
    expect(generate('refs/heads/testing', 'prefix_{name}-suffix', 40)).toBe(
      'prefix-refs-heads-testing-suffix'
    )
  })
})
