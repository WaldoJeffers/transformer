import curry from '../../src/utils/curry'

const _add = (a, b, c) => a + b + c
const add = curry(_add)

describe('utils/curry', () => {
  it('should currify the input function', () => {
    expect(add(1, 2, 3)).toBe(6)
    expect(add(1)(2)(3)).toBe(6)
    expect(add(1, 2)(3)).toBe(6)
    expect(add(1)(2, 3)).toBe(6)
  })
  it('should work if the function is supplied more arguments than its arity', () => {
    expect(add(1, 2, 3, 4)).toBe(6)
    expect(add(1)(2, 3, 4)).toBe(6)
    expect(add(1, 2)(3, 4)).toBe(6)
  })
  // throws
  //expect(add(1)(2)(3)(4)).toBe(6)
})
