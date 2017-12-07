import hasProps from '../src/hasProps'

describe('hasProps', () => {
  it('should return false for an undefined property', () => {
    expect(hasProps('middlename', {})).toBe(false)
  })
  it('should return true for a defined property', () => {
    expect(hasProps('firstname', { firstname: 'James' })).toBe(true)
  })
  it('should return false for an array where one property is undefined', () => {
    expect(hasProps(['firstname', 'middlename'], { firstname: 'James' })).toBe(
      false
    )
  })
  it('should return true for an array of defined properties', () => {
    expect(
      hasProps(['firstname', 'lastname'], { firstname: 'James', lastname: 'M' })
    ).toBe(true)
  })
})
