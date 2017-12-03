import wrapFn from '../lib/wrapFn'

describe('wrapFn', () => {
  it('should return a function returning the non-function value provided as input', () => {
    expect(wrapFn(42)()).toBe(42)
  })
  it('should return a function accepting the same arguments and returning the same result as the input function', () => {
    const add = (a, b) => a + b
    expect(wrapFn(add)(17, 25)).toBe(42)
  })
})
