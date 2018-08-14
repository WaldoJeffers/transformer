import curry from './curry'

const hasProp = (prop, input) =>
  Object.prototype.hasOwnProperty.call(input, prop)

const has = (props, input) =>
  (Array.isArray(props) ? props : [props]).every(prop => hasProp(prop, input))

export default curry(has)
