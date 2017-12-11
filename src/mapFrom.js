import branch from './branch'
import hasProps from './hasProps'
import pluck from './pluck'

const mapFrom = (inputProps, mapper = x => x) => reducer => (
  input,
  output,
  outputProp
) =>
  branch(
    hasProps(inputProps, input),
    () =>
      reducer(output, {
        [outputProp]:
          mapper.length === 1
            ? mapper(pluck(inputProps, input))
            : mapper(...inputProps.map(inputProp => input[inputProp])),
      }),
    output
  )

export default mapFrom
