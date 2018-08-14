import branch from '../../src/transformers/branch'
import identity from '../../src/utils/identity'
import { isTransformer } from '../../src/transformers/transformer'

const concat = (a, b) => `${a} ${b}`

describe('branch', () => {
  it('should return a transformer', () => {
    expect(isTransformer(branch())).toBe(true)
  })

  it('should run the truthy branch is the predicate is true', () => {
    expect(branch(() => true, identity)(concat)('Hello', 'World')).toBe(
      'Hello World'
    )
  })

  it('should run the falsy branch is the predicate is false', () => {
    expect(branch(() => false, null, identity)(concat)('Hello', 'World')).toBe(
      'Hello World'
    )
  })

  it('should return the accumulator when no falsy branch is provided and the predicate is false', () => {
    expect(branch(() => false, identity)(concat)('Hello', 'World')).toBe(
      'Hello'
    )
  })
})
