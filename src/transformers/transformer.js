import has from '../utils/has'
const IS_TRANSFORMER = Symbol()

export const transformer = fn => {
  const newFn = (...args) => fn(...args)
  newFn[IS_TRANSFORMER] = true
  return newFn
}

export const isTransformer = fn => has(IS_TRANSFORMER, fn)
