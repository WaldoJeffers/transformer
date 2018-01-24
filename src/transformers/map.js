import { transformer } from './transformer'

const map = mapper =>
  transformer(reducer => (acc, item) => reducer(acc, mapper(item)))

export default map
