import filter from "./filter"
import map from "./map"
import compose from "../utils/compose"
import has from "../utils/has"
import get from "../utils/get"
import pick from "../utils/pick"
import identity from "../utils/identity"

const mapFrom = (keys, mapper = identity) =>
  compose(
    filter(has(keys)),
    map(Array.isArray(keys) ? pick(keys) : get(keys)),
    map(mapper)
  )

export default mapFrom
