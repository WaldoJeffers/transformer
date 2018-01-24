import transform from '../src/transform'
import map from '../src/transformers/map'
import filter from '../src/transformers/filter'
import has from '../src/utils/has'
import compose from '../src/utils/compose'
import branch from '../src/transformers/branch'
import mapFrom from '../src/transformers/mapFrom'
import identity from '../src/transformers/identity'

const input = {
  firstname: 'James',
  lastname: 'M',
  age: 27,
  city: 'NYC',
}

describe('transformer v2', () => {
  it('should work', () => {
    const transformer = transform({
      firstname: compose(
        filter(has('firstname')),
        map(s => s.firstname.toUpperCase())
      ),
      lastname: branch(has('lastname'), map(i => i.lastname.toLowerCase())),
      middlename: mapFrom('firstname', s => s.toUpperCase()),
      age: x => x + 1,
      occupation: 'drummer',
      city: identity,
    })
    expect(transformer(input)).toEqual({
      firstname: 'JAMES',
      lastname: 'm',
      middlename: 'JAMES',
      age: 28,
      occupation: 'drummer',
      city: 'NYC',
    })
  })
})
