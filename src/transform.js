import assoc from './utils/assoc'
import curry from './utils/curry'
import mapFrom from './transformers/mapFrom'
import { isTransformer } from './transformers/transformer'

const transform = (descriptor, input) =>
  Object.entries(descriptor).reduce((acc, [key, transformer]) => {
    if (typeof transformer === 'function') {
      if (isTransformer(transformer)) {
        return transformer(assoc(key))(acc, input)
      }
      return mapFrom(key, transformer)(assoc(key))(acc, input)
    }
    return assoc(key, acc, transformer)
  }, {})

export default curry(transform)
