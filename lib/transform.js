import merge from './merge'

const transform = descriptor => input =>
  Object.entries(descriptor).reduce(
    (output, [outputProp, transformer]) =>
      typeof transformer === 'function'
        ? transformer(merge)(input, output, outputProp)
        : merge(output, { [outputProp]: transformer }),
    {}
  )

export default transform
