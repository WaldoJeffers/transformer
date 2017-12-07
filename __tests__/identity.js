import identity from '../src/identity'
import merge from '../src/merge'

describe('identity', () => {
  test('on a undefined property', () => {
    expect(identity(merge)({}, {}, 'middlename')).toEqual({})
  })
  test('on a defined property', () => {
    const input = { firstname: 'James' }
    expect(identity(merge)(input, {}, 'firstname')).toEqual({
      firstname: 'James',
    })
  })
})
