import { curry, hasProps, wrapFn } from './utils'

const _add = (a, b, c) => a + b + c
const input = {
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

describe('hasProps', () => {
  it('should return false for an undefined property', () => {
    expect(hasProps('middlename', input)).toBe(false)
  })
  it('should return true for a defined property', () => {
    expect(hasProps('firstname', input)).toBe(true)
  })
  it('should return false for an array where one property is undefined', () => {
    expect(hasProps(['firstname', 'middlename'], input)).toBe(false)
  })
  it('should return true for an array of defined properties', () => {
    expect(hasProps(['firstname', 'lastname'], input)).toBe(true)
  })
})

test('curry', () => {
  const add = curry(_add)
  expect(add(1, 2, 3)).toBe(6)
  expect(add(1)(2)(3)).toBe(6)
  expect(add(1, 2)(3)).toBe(6)
  expect(add(1)(2, 3)).toBe(6)
})

describe('wrapFn', () => {
  it('should return a function returning the non-function value provided as input', () => {
    expect(wrapFn(42)()).toBe(42)
  })
  it('should return a function accepting the same arguments and returning the same result as the input function', () => {
    expect(wrapFn((a, b) => a + b)(17, 25)).toBe(42)
  })
})
