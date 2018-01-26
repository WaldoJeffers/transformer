import pick from '../../src/utils/pick'

const obj = {
  firstname: 'James',
  lastname: 'M',
}

describe('utils/pick', () => {
  it('should return a new object containing only the picked properties', () => {
    expect(pick(['firstname'], obj)).toEqual({ firstname: 'James' })
  })
  it('should not include undefined properties', () => {
    expect(pick(['firstname', 'age'], obj)).toEqual({ firstname: 'James' })
  })
  it('should return an empty object when an empty array of keys is provided', () => {
    expect(pick([], obj)).toEqual({})
  })
})
