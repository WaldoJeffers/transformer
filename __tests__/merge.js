import merge from '../lib/merge'

describe('merge', () => {
  it('should be a pure function', () => {
    const obj = {}
    expect(merge(obj)).not.toBe(obj)
  })
  it('should return an empty object if both parameters are undefined', () => {
    expect(merge()).toEqual({})
  })
  it('should return a shallow copy of the first parameter if the second one is undefined', () => {
    const obj = { firstname: 'James' }
    expect(merge(obj)).toEqual(obj)
    expect(merge(obj)).not.toBe(obj)
  })
  it('should return a shallow copy of the second parameter if the first one is undefined', () => {
    const obj = { firstname: 'James' }
    expect(merge(undefined, obj)).toEqual(obj)
    expect(merge(undefined, obj)).not.toBe(obj)
  })
  it('should merge two objects', () => {
    const obj1 = { firstname: 'James' }
    const obj2 = { lastname: 'M' }
    expect(merge(obj1, obj2)).toEqual({
      firstname: 'James',
      lastname: 'M',
    })
  })
  it('should override properties right-to-left', () => {
    const obj1 = { firstname: 'James', lastname: 'H' }
    const obj2 = { lastname: 'M' }
    expect(merge(obj1, obj2)).toEqual({
      firstname: 'James',
      lastname: 'M',
    })
  })
})
