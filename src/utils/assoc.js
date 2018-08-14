import curry from './curry'

const assoc = (key, src, value) => ({ ...src, [key]: value })

export default curry(assoc)
