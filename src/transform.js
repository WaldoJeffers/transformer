import assoc from './utils/assoc'
import curry from './utils/curry'
import mapFrom from './transformers/mapFrom'
import { isTransformer } from './transformers/transformer'

const transform = (descriptor, input) =>
  Object.entries(descriptor).reduce((acc, [outputProp, transformer]) => {
    if (typeof transformer === 'function') {
      if (isTransformer(transformer)) {
        return transformer(assoc(outputProp))(acc, input)
      }
      return mapFrom(outputProp, transformer)(assoc(outputProp))(acc, input)
    }
    return assoc(outputProp, acc, transformer)
  }, {})

export default curry(transform)
