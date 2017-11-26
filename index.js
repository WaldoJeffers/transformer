import { branch, hasProps, pluck } from './utils'

const reducer = (output, prop, value) => ({ ...output, [prop]: value })

export const identity = (input, output, outputProp) =>
  mapFrom(outputProp)(input, output, outputProp)

const _mapFrom = (output, outputProp, inputProps, input, mapper) =>
  branch(
    hasProps(inputProps, input),
    () =>
      reducer(
        output,
        outputProp,
        inputProps.length === mapper.length
          ? mapper(...inputProps.map(inputProp => input[inputProp]))
          : mapper(pluck(inputProps, input))
      ),
    output
  )

export const map = mapper => (input, output, outputProp) =>
  _mapFrom(output, outputProp, outputProp, input, mapper)

export const mapFrom = (inputProps, mapper = x => x) => (
  input,
  output,
  outputProp
) => _mapFrom(output, outputProp, inputProps, input, mapper)

export const transform = descriptor => input =>
  Object.entries(descriptor).reduce(
    (output, [outputProp, transformer]) =>
      typeof transformer === 'function'
        ? transformer(input, output, outputProp)
        : reducer(output, outputProp, transformer),
    {}
  )
