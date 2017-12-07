import of from './of'

const branch = (condition, ifTrue, ifFalse) => of(condition ? ifTrue : ifFalse)

export default branch
