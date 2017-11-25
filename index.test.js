import { identity, mapFrom, transform } from './index'

const input = {
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

describe('identity', () => {
  test('on a undefined property', () => {
    expect(identity(input, {}, 'middlename')).toEqual({})
  })
  test('on a defined property', () => {
    expect(identity(input, {}, 'firstname')).toEqual({ firstname: 'James' })
  })
})

describe('mapFrom', () => {
  test('mapFrom on an undefined property', () => {
    expect(mapFrom('middlename')(input, {}, 'FirstName')).toEqual({})
  })
  test('mapFrom with a mapper on an undefined property', () => {
    expect(mapFrom('middlename', x => x.toUpperCase())(input, {}))
  })
  test('without a mapper', () => {
    expect(mapFrom('firstname')(input, {}, 'FirstName')).toEqual({
      FirstName: 'James',
    })
  })
  test('with a mapper', () => {
    expect(mapFrom('drumsticks', x => 2 * x)(input, {}, 'DrumSticks')).toEqual({
      DrumSticks: 4,
    })
  })
  test('on an array of props with an unkown prop', () => {
    expect(mapFrom(['firstname', 'middlename'])(input, {}, 'names')).toEqual({})
  })
  test('on an array of props without a mapper', () => {
    expect(mapFrom(['firstname', 'lastname'])(input, {}, 'names')).toEqual({
      names: { firstname: 'James', lastname: 'M' },
    })
  })
  test('on an array of props with a mapper', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        ({ firstname, lastname }) => `${firstname} ${lastname}`
      )(input, {}, 'fullname')
    ).toEqual({
      fullname: 'James M',
    })
  })
})

describe('transform', () => {
  it('should properly transform the input object', () => {
    expect(
      transform({
        fullname: mapFrom(
          ['firstname', 'lastname'],
          ({ firstname, lastname }) => `${firstname} ${lastname}`
        ),
        middlename: mapFrom('middlename', s => s.toUpperCase()),
        drumsticks: identity,
        role: mapFrom('occupation', s => s.toLowerCase()),
      })(input)
    ).toEqual({ fullname: 'James M', drumsticks: 2, role: 'drummer' })
  })
})
