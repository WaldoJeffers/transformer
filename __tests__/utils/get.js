import get from '../../src/utils/get'

describe('get', () => {
  describe('utils/get', () => {
    it('should return the value of the property whose key is passed as a parameter', () => {
      expect(get('firstname', { firstname: 'James' })).toBe('James')
    })
    it('should work on different kinds of iterables', () => {
      expect(get('firstname', { firstname: 'James' })).toBe('James')
      expect(get(1, ['James', 'M'])).toBe('M')
      expect(get(2, 'James')).toBe('m')
    })
    it('should return undefined when the key is not defined', () => {
      expect(get('lastname', { firstname: 'James' })).toBeUndefined()
    })
  })
})
