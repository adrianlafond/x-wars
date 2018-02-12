import isPlainObject from 'lodash.isplainobject'
import configure from '../src/configure'
import DEFAULTS from '../src/defaults'

describe('configuration', () => {

  const configDefault = configure()
  const configWeird1 = configure({
    time: '15.5',
  })
  const configWeird2 = configure({
    locations: [{ name: 'Place' }, { a: 'b' }],
    time: -10,
  })

  test('returns default object', () => {
    expect(isPlainObject(configDefault)).toBe(true)
    expect(isPlainObject(configWeird1)).toBe(true)
    expect(isPlainObject(configWeird2)).toBe(true)
  })

  test('has valid time', () => {
    expect(configDefault.time).toBe(DEFAULTS.time)
    expect(configWeird1.time).toBe(15)
    expect(configWeird2.time).toBe(DEFAULTS.time)
  })

  test('has multiple locations', () => {
    expect(configDefault.locations.length).toBeGreaterThan(1)
    expect(configWeird1.locations.length).toBeGreaterThan(1)
    expect(configWeird2.locations.length).toBeGreaterThan(1)
  })

  test('each location has a name', () => {
    const loop = (config) => {
      config.locations.forEach(item => {
        expect(typeof item.name).toBe('string')
        expect(item.name).toBeTruthy()
      })
    }
    loop(configDefault)
    loop(configWeird1)
    loop(configWeird2)
  })

  test('invalid locations should be replacd by defaults (as needed', () => {
    expect(configWeird2.locations[1]).toEqual(configDefault.locations[1])
    expect(configWeird2.locations[2]).toBe(undefined)
  })



  // test('defaults have multiple items', () => {
  //   expect(defaults.items.length).toBeGreaterThan(1)
  // })

  // test('each item has a name, min, and max', () => {
  //   defaults.items.forEach(item => {
  //     expect(typeof item.name).toBe('string')
  //     expect(item.name).toBeTruthy()
  //     expect(isNaN(item.min)).toBe(false)
  //     expect(item.min).toBeGreaterThan(0)
  //     expect(isNaN(item.max)).toBe(false)
  //     expect(item.max).toBeGreaterThan(item.min)
  //   })
  // })

  // test('defaults have at least one time unit', () => {
  //   expect(defaults.time).toBeGreaterThanOrEqual(1)
  // })

  // TODO: update now that pockets and lods belong to player!
  // test('defaults have at least 1 pocket', () => {
  //   expect(defaults.pockets).toBeGreaterThanOrEqual(1)
  // })

  // test('defaults have at least 1 loan', () => {
  //   expect(defaults.loans.length).toBeGreaterThanOrEqual(1)
  //   expect(defaults.loans[0].principal).toBeGreaterThan(0)
  //   expect(defaults.loans[0].interest).toBeGreaterThan(0)
  // })
})
