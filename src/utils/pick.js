import curry from './curry'
import has from './has'
import assoc from './assoc'

const pick = (keys, object) =>
  keys.reduce(
    (acc, key) => (has(key, object) ? assoc(key, acc, object[key]) : acc),
    {}
  )

export default curry(pick)
