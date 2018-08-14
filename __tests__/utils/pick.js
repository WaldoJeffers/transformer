import pick from '../../src/utils/pick'

describe('pick', () => {
  it('should return an array of values picked by keys from an object', () => {
    const input = { firstname: 'James', lastname: 'M', age: 27 }
    const output = pick(['firstname', 'lastname'], input)
    expect(output).toEqual(['James', 'M'])
  })

  it('should work in a curried form', () => {
    const input = { firstname: 'James', lastname: 'M', age: 27 }
    const output = pick(['firstname', 'lastname'])(input)
    expect(output).toEqual(['James', 'M'])
  })

  it('should pick undefined values', () => {
    const input = { firstname: 'James', lastname: 'M' }
    const output = pick(['firstname', 'lastname', 'age'])(input)
    expect(output).toEqual(['James', 'M', undefined])
  })
})
