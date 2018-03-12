import Locations from '../src/configuration/locations'
import DEFAULTS from '../src/defaults'

describe('Configuration/Locations', () => {
  function loc(locations) {
    return new Locations({ locations }).data
  }

  test('returns defaults if config not a valid array', () => {
    expect(loc()).toEqual(DEFAULTS.locations)
    expect(loc(null)).toEqual(DEFAULTS.locations)
    expect(loc({})).toEqual(DEFAULTS.locations)
    expect(loc('place')).toEqual(DEFAULTS.locations)
    expect(loc([])).toEqual(DEFAULTS.locations)
  })

  test('locations length will be >= 2', () => {
    expect(loc(['Foo'])).toEqual(['Foo', DEFAULTS.locations[1]])
  })

  test('locations will be a unique set', () => {
    expect(loc(['Foo', 'Bar', 'Baz', 'Bar'])).toEqual(
      ['Foo', 'Bar', 'Baz'])
    expect(loc(['Foo', 'Foo'])).toEqual(['Foo', DEFAULTS.locations[1]])
  })
})
