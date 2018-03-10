import Items from '../src/configuration/items'
import DEFAULTS from '../src/defaults'

describe('Configuration/Locations', () => {

  function getItems(items) {
    return new Items({ items }).data
  }

  test('returns defaults if config not a valid type', () => {
    expect(getItems()).toEqual(DEFAULTS.items)
    expect(getItems(null)).toEqual(DEFAULTS.items)
    expect(getItems({})).toEqual(DEFAULTS.items)
    expect(getItems('string')).toEqual(DEFAULTS.items)
    expect(getItems([])).toEqual(DEFAULTS.items)
  })

  test('each item has name, min, max', () => {
    // On B removed: We can set a default min to 0 (easy/fine), but setting a
    // default max is not practical without context (scale of loans, money).
    const items = getItems([
      { name: 'A', min: 0, max: 100 },
      { name: 'B', min: 0 },
      { name: 'C', max: 100 },
      { min: 0, max: 100 },
    ])
    expect(items[0].name).toBe('A')
    expect(items[1].name).toBe('C')
    expect(items.length).toBe(2)
  })

  test('item max must always be greated than min', () => {
    const items = getItems([{ name: 'A', max: 100, min: 200 }])
    expect(items[0].min).toBe(200)
    expect(items[0].max).toBe(200)
  })

  test('items have unique names', () => {
    const items = getItems([
      { name: 'A', min: 100, max: 500 },
      { name: 'A', max: 100 },
    ])
    expect(items.length).toBe(1)
    expect(items[0].name).toBe('A')
    expect(items[0].max).toBe(500)
  })
})
