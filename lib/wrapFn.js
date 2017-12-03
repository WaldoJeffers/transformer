const wrapFn = input =>
  typeof input === 'function' ? (...args) => input(...args) : () => input

export default wrapFn
