import of from '../lib/of'

describe('of', () => {
  it('should return the input when provided with anything other than a function', () => {
    expect(of(2)).toBe(2)
  })
  it('should return the result of a function when provided with a function', () => {
    const fn = () => 2
    expect(of(fn)).toBe(2)
  })
})
