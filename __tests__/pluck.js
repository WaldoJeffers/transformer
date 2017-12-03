import pluck from '../lib/pluck'

describe('pluck', () => {
  it('should return undefined when retrieving a non-existing propery', () => {
    expect(pluck('hello', {})).toBeUndefined()
  })
  it('should return a property\'s value', () => {
    const obj = { firstname: 'James' }
    expect(pluck('firstname', obj)).toBe('James')
  })
  it('should retrieve an array of values when provided with an array of keys', () => {
    const obj = { firstname: 'James', lastname: 'M' }
    expect(pluck(['firstname', 'middlename', 'lastname'], obj)).toEqual({
      firstname: 'James',
      middlename: undefined,
      lastname: 'M',
    })
  })
})
