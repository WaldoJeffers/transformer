import curry from './curry'

const pick = (keys, collection) => keys.map(key => collection[key])

export default curry(pick)
