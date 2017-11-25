import { branch, hasProps, pluck } from './utils'

const reducer = (output, prop, value) => ({ ...output, [prop]: value })

export const identity = (input, output, outputProp) =>
  mapFrom(outputProp)(input, output, outputProp)

export const mapFrom = (inputProps, mapper = x => x) => (
  input,
  output,
  outputProp
) =>
  branch(
    hasProps(inputProps, input),
    () => reducer(output, outputProp, mapper(pluck(inputProps, input))),
    output
  )

export const transform = descriptor => input =>
  Object.entries(descriptor).reduce(
    (output, [outputProp, transformer]) =>
      transformer(input, output, outputProp),
    {}
  )
