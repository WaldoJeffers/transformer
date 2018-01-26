import identity from '../../src/utils/identity'

describe('utils/identity', () => {
  it('should return the first parameter', () => {
    expect(identity(2)).toBe(2)
  })
  it('should work on objects', () => {
    const obj = { hello: 'world' }
    expect(identity(obj)).toBe(obj)
  })
  it('should only return the first argument when multiple arguments are passed', () => {
    expect(identity(42, true, 'hello')).toBe(42)
  })
  it('should return undefined when no arguments are passed', () => {
    expect(identity()).toBeUndefined()
  })
})
