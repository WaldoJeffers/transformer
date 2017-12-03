const of = input => (typeof input === 'function' ? input() : input)

export default of
