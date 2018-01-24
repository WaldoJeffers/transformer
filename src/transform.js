import assoc from './utils/assoc'
import mapFrom from './transformers/mapFrom'
import identity from './transformers/identity'
import { isTransformer } from './transformers/transformer'

const transform = descriptor => input =>
  Object.entries(descriptor).reduce((acc, [outputProp, transformer]) => {
    if (typeof transformer === 'function') {
      if (isTransformer(transformer)) {
        return transformer(assoc(outputProp))(acc, input)
      }
      return mapFrom(outputProp, transformer)(assoc(outputProp))(acc, input)
    } else if (transformer === identity) {
      return mapFrom(outputProp, x => x)(assoc(outputProp))(acc, input)
    }
    return assoc(outputProp, acc, transformer)
  }, {})

export default transform
