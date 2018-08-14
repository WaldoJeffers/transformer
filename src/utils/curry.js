const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...moreArgs) => curry(fn)(...args, ...moreArgs)

export default curry
