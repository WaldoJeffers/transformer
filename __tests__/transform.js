import identity from '../src/utils/identity'
import compose from '../src/utils/compose'
import get from '../src/utils/get'
import has from '../src/utils/has'
import filter from '../src/transformers/filter'
import map from '../src/transformers/map'
import mapFrom from '../src/transformers/mapFrom'
import transform from '../src/transform'
import branch from '../src/transformers/branch'

const input = {
  age: '27',
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

const toUpperCase = x => x.toUpperCase()

describe('transform', () => {
  it('should strip off properties not specified in the descriptor', () => {
    expect(transform({})(input)).toEqual({})
  })

  it('should accept single values as transformers', () => {
    expect(transform({ awesome: true })(input)).toEqual({ awesome: true })
  })

  it('should accept functions as 1-to-1 mappers', () => {
    expect(transform({ firstname: toUpperCase })(input)).toEqual({
      firstname: 'JAMES',
    })
  })

  // TO DO: spy on the mapper, makes sure its not called
  it('should properly transform the input object', () => {
    expect(
      transform({
        age: Number,
        fullname: mapFrom(['firstname', 'lastname'], names => names.join(' ')),
        middlename: mapFrom('middlename', s => s.toUpperCase()),
        drumsticks: identity,
        role: compose(
          filter(has('occupation')),
          map(get('occupation')),
          map(s => s.toLowerCase())
        ),
        vegan: branch(has(['firstname', 'lastname']), map(() => true)),
      })(input)
    ).toEqual({
      age: 27,
      fullname: 'James M',
      drumsticks: 2,
      role: 'drummer',
      vegan: true,
    })
  })
})
