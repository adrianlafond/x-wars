import inPlainObject from 'lodash.isplainobject';
import Config from '../src/config'

describe('config defaults', () => {
  const config = new Config()
  const defaults = config.get('defaults')

  test('Defaults are imported as JSON', () => {
    expect(isPlainObject(defaults)).toBe(true)
  })

  test('defaults have multiple locations', () => {
    expect(defaults.locations.length).toBeGreaterThan(1)
  })

  test('each location has a name', () => {
    defaults.locations.forEach(item => {
      expect(typeof item.name).toBe('string')
      expect(item.name).toBeTruthy()
    })
  })

  test('defaults have multiple items', () => {
    expect(defaults.items.length).toBeGreaterThan(1)
  })

  test('each item has a name, min, and max', () => {
    defaults.items.forEach(item => {
      expect(typeof item.name).toBe('string')
      expect(item.name).toBeTruthy()
      expect(isNaN(item.min)).toBe(false)
      expect(item.min).toBeGreaterThan(0)
      expect(isNaN(item.max)).toBe(false)
      expect(item.max).toBeGreaterThan(item.min)
    })
  })

  test('defaults have at least one time unit', () => {
    expect(defaults.time).toBeGreaterThanOrEqual(1)
  })

  test('defaults have at least 1 pocket', () => {
    expect(defaults.pockets).toBeGreaterThanOrEqual(1)
  })

  test('defaults have at least 1 loan', () => {
    expect(defaults.loans.length).toBeGreaterThanOrEqual(1)
    expect(defaults.loans[0].principal).toBeGreaterThan(0)
    expect(defaults.loans[0].interest).toBeGreaterThan(0)
  })
})
