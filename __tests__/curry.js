import curry from '../src/curry'

const _add = (a, b, c) => a + b + c

describe('curry', () => {
  it('should currify the input function', () => {
    const add = curry(_add)
    expect(add(1, 2, 3)).toBe(6)
    expect(add(1)(2)(3)).toBe(6)
    expect(add(1, 2)(3)).toBe(6)
    expect(add(1)(2, 3)).toBe(6)
  })
})
