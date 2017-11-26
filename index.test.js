import { identity, map, mapFrom, transform } from './index'

const input = {
  age: '27',
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

describe('map', () => {
  test('on a undefined property', () => {
    expect(map(s => s.toLowerCase())(input, {}, 'unkwown')).toEqual({})
  })
  test('on a defined property', () => {
    expect(map(s => s.toLowerCase())(input, {}, 'occupation')).toEqual({
      occupation: 'drummer',
    })
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
  test('on an array of props without a mapper', () => {
    expect(mapFrom(['firstname', 'lastname'])(input, {}, 'fullname')).toEqual({
      fullname: {
        firstname: 'James',
        lastname: 'M',
      },
    })
  })
  test('on an array of props with a mapper accepting 1 argument', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        ({ firstname, lastname }) => `${firstname} ${lastname}`
      )(input, {}, 'fullname')
    ).toEqual({
      fullname: 'James M',
    })
  })
  test('on an array of props with a mapper accepting more than 1 argument', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        (firstname, lastname) => `${firstname} ${lastname}`
      )(input, {}, 'fullname')
    ).toEqual({
      fullname: 'James M',
    })
  })
})

describe('transform', () => {
  it('should strip off properties not specified in the descriptor', () => {
    expect(transform({})(input)).toEqual({})
  })
  // TO DO: spy on the mapper, makes sure its not called
  it('should accept single values as transformers', () => {
    expect(transform({ awesome: true })(input)).toEqual({ awesome: true })
  })
  it('should properly transform the input object', () => {
    expect(
      transform({
        age: map(Number),
        fullname: mapFrom(
          ['firstname', 'lastname'],
          ({ firstname, lastname }) => `${firstname} ${lastname}`
        ),
        middlename: mapFrom('middlename', s => s.toUpperCase()),
        drumsticks: identity,
        role: mapFrom('occupation', s => s.toLowerCase()),
      })(input)
    ).toEqual({ age: 27, fullname: 'James M', drumsticks: 2, role: 'drummer' })
  })
})
