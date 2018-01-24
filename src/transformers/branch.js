import reduced from './reduced'
import { transformer } from './transformer'

const branch = (predicate, ifTrue, ifFalse = reduced) =>
  transformer(reducer => (acc, item) =>
    (predicate(item) ? ifTrue : ifFalse)(reducer)(acc, item)
  )

export default branch
