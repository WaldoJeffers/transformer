const curry = f => (...args) =>
  args.length >= f.length
    ? f(...args)
    : (...moreArgs) => curry(f)(...args, ...moreArgs)

export default curry
