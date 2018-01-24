import curry from './curry'

const get = (key, collection) => collection[key]

export default curry(get)
