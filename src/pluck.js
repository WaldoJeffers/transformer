import merge from './merge'

const pluck = (props, input) =>
  Array.isArray(props)
    ? props.reduce((output, prop) => merge(output, { [prop]: input[prop] }), {})
    : input[props]

export default pluck
