import { transformer } from './transformer'

const filter = predicate =>
  transformer(reducer => (acc, item) =>
    predicate(item) ? reducer(acc, item) : acc
  )

export default filter
