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
          inputProps.length === mapper.length
            ? mapper(...inputProps.map(inputProp => input[inputProp]))
            : mapper(pluck(inputProps, input)),
      }),
    output
  )

export default mapFrom
