const pluck = (props, input) =>
  Array.isArray(props)
    ? props.reduce((output, prop) => ({ ...output, [prop]: input[prop] }), {})
    : input[props]

export default pluck
