const hasProp = (prop, input) =>
  Object.prototype.hasOwnProperty.call(input, prop)

const hasProps = (props, input) =>
  (Array.isArray(props) ? props : [props]).every(prop => hasProp(prop, input))

export default hasProps
