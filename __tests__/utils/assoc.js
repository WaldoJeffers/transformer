import assoc from '../../src/utils/assoc'

describe('assoc', () => {
  it('should add a new property to an object', () => {
    expect(assoc('lastname', { firstname: 'James' }, 'M')).toEqual({
      firstname: 'James',
      lastname: 'M',
    })
  })
  it('should return a new object', () => {
    const obj = { firstname: 'James' }
    expect(assoc('lastname', obj, 'M')).not.toBe(obj)
  })
  it('should not mutate the source object', () => {
    const obj = { firstname: 'James' }
    assoc('lastname', obj, 'M')
    expect(obj).toEqual({ firstname: 'James' })
  })
})
