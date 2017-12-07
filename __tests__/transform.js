import identity from '../src/identity'
import map from '../src/map'
import mapFrom from '../src/mapFrom'
import transform from '../src/transform'

const input = {
  age: '27',
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

describe('transform', () => {
  it('should strip off properties not specified in the descriptor', () => {
    expect(transform({})(input)).toEqual({})
  })
  it('should accept single values as transformers', () => {
    expect(transform({ awesome: true })(input)).toEqual({ awesome: true })
  })
  // TO DO: spy on the mapper, makes sure its not called
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
