import branch from '../lib/branch'

describe('branch', () => {
  it('should return the truth branch when the condition is truthy', () => {
    expect(branch(true, 2)).toBe(2)
    expect(branch(true, () => 2)).toBe(2)
  })

  it('should return the falseness branch when the condition is falsy', () => {
    expect(branch(false, null, 3)).toBe(3)
    expect(branch(false, null, () => 3)).toBe(3)
  })

  // TO DO: spy to make sure the branches are not called when they are functions
})
