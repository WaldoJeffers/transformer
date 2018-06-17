import mapFrom from '../../src/transformers/mapFrom'
import assoc from '../../src/utils/assoc'
import { isTransformer } from '../../src/transformers/transformer'

const input = {
  age: '27',
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

describe('mapFrom', () => {
  it('should return a transformer', () => {
    expect(isTransformer(mapFrom())).toBe(true)
  })

  it('should pick the property and run the mapper on its value', () => {
    expect(
      mapFrom('drumsticks', x => 2 * x)(assoc('DrumSticks'))({}, input)
    ).toEqual({
      DrumSticks: 4,
    })
  })

  it('should pass the picked properties to a 1-arity mapper and run mapper on their value', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        ([firstname, lastname]) => `${firstname} ${lastname}`
      )(assoc('fullname'))({}, input)
    ).toEqual({
      fullname: 'James M',
    })
  })

  it('should not pick an undefined property', () => {
    expect(mapFrom('middlename')(assoc('middlename'))({}, input)).toEqual({})
  })

  it('should not run the mapper on an undefined property', () => {
    expect(
      mapFrom('middlename', x => x.toUpperCase())(assoc('middlename'))(
        {},
        input
      )
    )
  })

  it('should throw if no mapper is provided', () => {
    expect(mapFrom('firstname')(assoc('fullname'))).toThrow()
    expect(mapFrom(['firstname', 'lastname'])(assoc('fullname'))).toThrow()
  })

  it('should not work on an array of props containing an unkown prop', () => {
    expect(
      mapFrom(['firstname', 'middlename'])(assoc('fullname'))({}, input)
    ).toEqual({})
  })

  it.skip('on an array of props with a mapper accepting more than 1 argument', () => {
    expect(
      mapFrom(
        ['firstname', 'lastname'],
        (firstname, lastname) => `${firstname} ${lastname}`
      )(assoc('fullname'))({}, input)
    ).toEqual({
      fullname: 'James M',
    })
  })
})