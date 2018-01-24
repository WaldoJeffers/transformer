const reduce = (fn, seed, collection) =>
  Array.isArray(collection)
    ? collection.reduce(fn, seed)
    : Object.entries(collection).reduce(
      (acc, [key, val]) => fn(acc, val, key, collection),
      seed
    )

export default reduce

