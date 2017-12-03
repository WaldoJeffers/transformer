import mapFrom from './mapFrom'

const map = mapper => reducer => (input, output, outputProp) =>
  mapFrom(outputProp, mapper)(reducer)(input, output, outputProp)

export default map
