import reduce from './reduce'

const transduce = (transformer, reducer, seed, collection) =>
  reduce(transformer(reducer), seed, collection)

export default transduce
