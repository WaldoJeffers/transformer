import has from '../src/has'

describe('has', () => {
  it('should return false for an undefined property', () => {
    expect(has('middlename', {})).toBe(false)
  })
  it('should return true for a defined property', () => {
    expect(has('firstname', { firstname: 'James' })).toBe(true)
  })
  it('should return false for an array where one property is undefined', () => {
    expect(has(['firstname', 'middlename'], { firstname: 'James' })).toBe(
      false
    )
  })
  it('should return true for an array of defined properties', () => {
    expect(
      has(['firstname', 'lastname'], { firstname: 'James', lastname: 'M' })
    ).toBe(true)
  })
})
