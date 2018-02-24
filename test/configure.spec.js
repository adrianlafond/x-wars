import isPlainObject from 'lodash.isplainobject'
import merge from 'lodash.merge'
import configure, {
  configureTime,
  configureLocations,
  configurePlayerLoans,
  configurePlayerLocation,
  configurePlayerValueObject,
  configurePlayerStorage,
  configureRandomEvent,
  configureRandomStorage,
  configureScore,
} from '../src/configure'
import DEFAULTS from '../src/defaults'

describe('configuration', () => {
  test('returns default object', () => {
    expect(isPlainObject(configure(DEFAULTS))).toBe(true)
  })

  test('time configured to a valid integer', () => {
    expect(configureTime(DEFAULTS.player.time)).toEqual(DEFAULTS.player.time)
    expect(configureTime(15.5)).toEqual(15)
    expect(configureTime('15.5')).toEqual(15)
    expect(configureTime(-10)).toEqual(DEFAULTS.time)
    expect(configureTime(null)).toEqual(DEFAULTS.time)
    expect(configureTime()).toEqual(DEFAULTS.time)
  })

  test('locations are multiple and has a unique name', () => {
    // Filled in with first 2 defaults to make length >= 2:
    const test1 = []

    // Trimmed to 3 with unique names:
    const test2 = ['foo', 'bar', 'baz', 'bar', 'baz']

    // Test previous 2 specs together (2nd will be replaced with default):
    const test3 = ['foo', 'foo']

    expect(configureLocations()).toEqual(DEFAULTS.locations)
    expect(configureLocations(test1)).toEqual(DEFAULTS.locations.slice(0, 2))
    expect(configureLocations(test2)).toEqual(test2.slice(0, 3))
    expect(configureLocations(test3)).toEqual([
      test3[0],
      DEFAULTS.locations[1],
    ])
  })

  test('loans have valid principal, interest, amount', () => {
    expect(configurePlayerLoans()).toEqual(DEFAULTS.player.loans)
    expect(configurePlayerLoans([])).toEqual([])
    expect(configurePlayerLoans([{ principal: -1000 }])).toEqual([])
    expect(configurePlayerLoans([{ principal: 0 }])).toEqual([])
    expect(configurePlayerLoans([{ amount: 1000 }])).toEqual([])
    expect(configurePlayerLoans([{ principal: 1000, interest: -1 }])).toEqual([
      { principal: 1000, interest: 0, amount: 1000 },
    ])
    // `amount` always starts equal to `principal`:
    expect(configurePlayerLoans([
      { principal: 1000, interest: 0.1, amount: 2000 },
    ])).toEqual([
      { principal: 1000, interest: 0.1, amount: 1000 },
    ])
  })

  test('player has a valid location', () => {
    const test1 = DEFAULTS.locations.indexOf(
      configurePlayerLocation(undefined, DEFAULTS.locations))
    const test2 = DEFAULTS.locations.indexOf(
      configurePlayerLocation(null, DEFAULTS.locations))
    const test3 = DEFAULTS.locations.indexOf(
      configurePlayerLocation('InvalidLocationName', DEFAULTS.locations))
    const test4 = DEFAULTS.locations.indexOf(
      configurePlayerLocation(DEFAULTS.locations[0], DEFAULTS.locations))
    expect(test1).not.toBe(-1)
    expect(test2).not.toBe(-1)
    expect(test3).not.toBe(-1)
    expect(test4).not.toBe(-1)
  })

  // player $ (cash, bank, storage, health, etc)'
  function testValueObject(defaults) {
    const fn = configurePlayerValueObject
    const outputDefaults = {
      value: defaults.value,
      max: (defaults.max === '*') ? Number.MAX_VALUE : defaults.max,
      min: (defaults.min === '*') ? Number.MIN_VALUE : defaults.min,
    }
    expect(fn(null, defaults)).toEqual(outputDefaults)
    expect(fn(defaults.value, defaults)).toEqual(outputDefaults)
    expect(fn(1000, { value: 1000, max: 500, min: 0 }).value).toEqual(500)
    expect(fn(250, { value: 1000, max: '*', min: 500 }).value).toEqual(500)
    expect(fn(1000, { max: 500, min: 1500 }).value).toEqual(500)
    expect(fn(null, { max: 1000, min: 100 }).value).toBe(100)
    expect(fn(Number.MAX_VALUE, { max: '*', min: 0 }).value)
      .toEqual(Number.MAX_VALUE)
    expect(fn(-1000, { max: '*', min: '*' }).value)
      .toEqual(0)
    expect(fn(null, { max: '*', min: '*' }).max)
      .toEqual(Number.MAX_VALUE)
    expect(fn(null, { max: '*', min: '*' }).min)
      .toEqual(0)
  }

  test('player cash', () => {
    testValueObject(DEFAULTS.player.cash)
  })

  test('player bank', () => {
    testValueObject(DEFAULTS.player.bank)
  })

  test('player health', () => {
    testValueObject(DEFAULTS.player.health)
  })

  test('player storage', () => {
    const fn = configurePlayerStorage
    const defaultStorage = DEFAULTS.player.storage
    const defaultFilled = {}
    DEFAULTS.items.forEach((item) => {
      defaultFilled[item.name] = 0
    })
    const outputDefaults = {
      value: defaultStorage.value,
      max: (defaultStorage.max === '*') ? Number.MAX_VALUE : defaultStorage.max,
      min: (defaultStorage.min === '*') ? 0 : defaultStorage.min,
      filled: defaultStorage.filled || defaultFilled,
    }
    let defaults = merge({}, DEFAULTS)

    expect(fn(null, defaults)).toEqual(outputDefaults)
    expect(fn(defaults.value, defaults)).toEqual(outputDefaults)

    defaults.player.storage = { value: 1000, max: 500, min: 0 }
    expect(fn(1000, defaults).value).toEqual(500)

    defaults.player.storage = { value: 1000, max: '*', min: 500 }
    expect(fn(250, defaults).value).toEqual(500)

    defaults.player.storage = { max: 500, min: 1500 }
    expect(fn(1000, defaults).value).toEqual(500)

    defaults.player.storage = { max: 1000, min: 100 }
    expect(fn(null, defaults).value).toBe(100)

    defaults.player.storage = { max: '*', min: 0 }
    expect(fn(Number.MAX_VALUE, defaults).value).toEqual(Number.MAX_VALUE)
    expect(fn(-1000, defaults).value).toEqual(0)
    expect(fn(null, defaults).max).toEqual(Number.MAX_VALUE)
    expect(fn(null, defaults).min).toEqual(0)
  })

  test('random event config', () => {
    const fn = configureRandomEvent
    const def = { enabled: true, odds: 0.1 }
    expect(fn(undefined, def).enabled).toEqual(true)
    expect(fn(undefined, def).odds).toEqual(0.1)
    expect(fn({ enabled: false }, def)).toEqual({ enabled: false })
    expect(fn({ odds: -0.5 }).odds).toBe(0)
    expect(fn({ odds: 1.5 }).odds).toBe(1)
    expect(fn({ odds: 0.5 }).odds).toBe(0.5)
    expect(fn(null, def, 10).times.length).toBe(1)
    expect(fn(null, def, 10).times[0]).toBeGreaterThanOrEqual(0)
    expect(fn(null, def, 10).times[0]).toBeLessThan(10)
    expect(fn({ odds: 0.5 }, def, 10).times.length).toBe(5)
    expect(fn({ odds: 0.5, enabled: false }, def, 10).times).toBeUndefined()
    // 4 total times, odds should fill 2, but room for only 1:
    expect(fn({ odds: 0.5 }, def, 4, [null, 'a', 'b', 'c']).times.length).toBe(1)
    // 4 total times, odds should fill 4, but no room left:
    expect(fn({ odds: 1 }, def, 4, ['x', 'a', 'b', 'c']).times.length).toBe(0)
  })

  test('random "storage" offered at preset times', () => {
    const fn = configureRandomStorage
    const def = { data: { multiple: 2, cost: 10 } }
    expect(fn(undefined, def).data).toEqual(def.data)
    expect(fn({ data: null }, def).data).toEqual(def.data)
    expect(fn({ data: { multiple: 1.5, cost: 5 } }, def).data).toEqual(
      { multiple: 1.5, cost: 5 })
  })
})
