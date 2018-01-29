import map from '../../src/transformers/map'
import { isTransformer } from '../../src/transformers/transformer'

const concat = (a, b) => a + ' ' + b

describe('map', () => {
  it('should return a transformer', () => {
    expect(isTransformer(map())).toBe(true)
  })
  it('should map over the item using the provided mapper', () => {
    expect(map(s => s.toUpperCase())(concat)('James', 'm')).toBe('James M')
  })
})
