const curryN = (N, fn) => (...args) =>
  args.length === N
    ? fn(...args)
    : curryN(N - args.length, (...args2) => fn(...args, ...args2))

const curry = fn => curryN(fn.length, fn)

export default curry
