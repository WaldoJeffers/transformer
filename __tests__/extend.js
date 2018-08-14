import identity from '../src/utils/identity'
import compose from '../src/utils/compose'
import get from '../src/utils/get'
import has from '../src/utils/has'
import filter from '../src/transformers/filter'
import map from '../src/transformers/map'
import mapFrom from '../src/transformers/mapFrom'
import extend from '../src/extend'
import branch from '../src/transformers/branch'

const input = {
  age: '27',
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

const toUpperCase = x => x.toUpperCase()

describe('extend', () => {
  it('should keep properties not specified in the descriptor', () => {
    expect(extend({})(input)).toEqual(input)
  })

  it('should accept single values as transformers', () => {
    expect(extend({ awesome: true })(input)).toEqual({
      ...input,
      awesome: true,
    })
  })

  it('should accept functions as 1-to-1 mappers', () => {
    expect(extend({ firstname: toUpperCase })(input)).toEqual({
      ...input,
      firstname: 'JAMES',
    })
  })

  // TO DO: spy on the mapper, make sure its not called
  it('should properly extend the input object', () => {
    expect(
      extend({
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
      ...input,
      age: 27,
      fullname: 'James M',
      drumsticks: 2,
      role: 'drummer',
      vegan: true,
    })
  })
})
