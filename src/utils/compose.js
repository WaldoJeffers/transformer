const compose = (f, g) => (...args) => f(g(...args))

const composeWithSymbols = (f, g) => {
  const composed = compose(f, g)
  Object.getOwnPropertySymbols(f).forEach(
    symbol => (composed[symbol] = f[symbol])
  )
  return composed
}

const composeAll = (...fns) => fns.reduce(composeWithSymbols)

export default composeAll
