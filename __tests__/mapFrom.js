import mapFrom from '../src/mapFrom'
import merge from '../src/merge'

const input = {
  age: '27',
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

describe('mapFrom', () => {
  test('mapFrom on an undefined property', () => {
    expect(mapFrom('middlename')(merge)(input, {}, 'FirstName')).toEqual({})
  })
  test('mapFrom with a mapper on an undefined property', () => {
    expect(mapFrom('middlename', x => x.toUpperCase())(merge)(input, {}))
  })
  test('without a mapper', () => {
    expect(mapFrom('firstname')(merge)(input, {}, 'FirstName')).toEqual({
      FirstName: 'James',
    })
  })
  test('with a mapper', () => {
    expect(
      mapFrom('drumsticks', x => 2 * x)(merge)(input, {}, 'DrumSticks')
    ).toEqual({
      DrumSticks: 4,
    })
  })
  test('on an array of props with an unkown prop', () => {
    expect(
      mapFrom(['firstname', 'middlename'])(merge)(input, {}, 'names')
    ).toEqual({})
  })
  test('on an array of props without a mapper', () => {
    expect(
      mapFrom(['firstname', 'lastname'])(merge)(input, {}, 'names')
    ).toEqual({
      names: { firstname: 'James', lastname: 'M' },
    })
  })
  test('on an array of props with a mapper accepting 1 argument', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        ({ firstname, lastname }) => `${firstname} ${lastname}`
      )(merge)(input, {}, 'fullname')
    ).toEqual({
      fullname: 'James M',
    })
  })
  test('on an array of props with a mapper accepting more than 1 argument', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        (firstname, lastname) => `${firstname} ${lastname}`
      )(merge)(input, {}, 'fullname')
    ).toEqual({
      fullname: 'James M',
    })
  })
  test('on an array of props with a mapper using the rest operator', () => {
    expect(
      mapFrom(['firstname', 'lastname'], (...args) => args.join(' '))(merge)(
        input,
        {},
        'fullname'
      )
    ).toEqual({
      fullname: 'James M',
    })
  })
})
