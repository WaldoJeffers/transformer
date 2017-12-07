import map from '../src/map'
import merge from '../src/merge'

describe('map', () => {
  test('on a undefined property', () => {
    expect(map(s => s.toLowerCase())(merge)({}, {}, 'unkwown')).toEqual({})
  })
  test('on a defined property', () => {
    const input = { occupation: 'Drummer' }
    expect(map(s => s.toLowerCase())(merge)(input, {}, 'occupation')).toEqual({
      occupation: 'drummer',
    })
  })
})
