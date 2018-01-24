const pick = keys => reducer => (acc, item) =>
  reducer(acc, keys.map(key => item[key]))

export default pick
