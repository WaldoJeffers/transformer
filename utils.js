const curryN = (N, fn) => (...args) =>
  args.length === N
    ? fn(...args)
    : curryN(N - args.length, (...args2) => fn(...args, ...args2))

export const curry = fn => curryN(fn.length, fn)

const of = input => (typeof input === 'function' ? input() : input)

export const branch = (condition, ifTrue, ifFalse) =>
  of(condition ? ifTrue : ifFalse)

const _hasProp = (prop, input) =>
  Object.prototype.hasOwnProperty.call(input, prop)

export const hasProp = curry(_hasProp)

const _hasProps = (props, input) =>
  (Array.isArray(props) ? props : [props]).every(prop => hasProp(prop, input))

export const hasProps = curry(_hasProps)

export const pluck = (props, input) =>
  Array.isArray(props)
    ? props.reduce((output, prop) => ({ ...output, [prop]: input[prop] }), {})
    : input[props]

export const wrapFn = input =>
  typeof input === 'function' ? (...args) => input(...args) : () => input
