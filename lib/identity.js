import mapFrom from './mapFrom'

const identity = reducer => (input, output, outputProp) =>
  mapFrom(outputProp)(reducer)(input, output, outputProp)

export default identity
