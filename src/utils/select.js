import curry from './curry'
import get from './get'

const select = (keys, collection) => keys.map(key => get(key, collection))

export default curry(select)
