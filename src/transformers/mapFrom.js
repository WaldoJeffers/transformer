import filter from './filter'
import map from './map'
import compose from '../utils/compose'
import has from '../utils/has'
import get from '../utils/get'
import select from '../utils/select'

const mapFrom = (keys, mapper) =>
  compose(
    filter(has(keys)),
    map(Array.isArray(keys) ? select(keys) : get(keys)),
    map(mapper)
  )

export default mapFrom
