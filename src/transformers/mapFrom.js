import filter from './filter'
import map from './map'
import compose from '../utils/compose'
import has from '../utils/has'
import pick from '../utils/pick'
import get from '../utils/get'

const mapFrom = (keys, mapper) =>
  compose(
    filter(has(keys)),
    map(Array.isArray(keys) ? pick(keys) : get(keys)),
    map(mapper)
  )

export default mapFrom
