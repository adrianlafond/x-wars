import Player from '../src/configuration/player'
import DEFAULTS from '../src/defaults'

describe('Configuration/Player', () => {

  function pd(mergeObj, rootObj = {}) {
    const player = Object.assign({}, DEFAULTS.player, mergeObj)
    return new Player(Object.assign({}, DEFAULTS, { player }, rootObj)).data
  }

  function testIntegerValue(prop) {
    test(`${prop} is a valid integer`, () => {
      expect(pd()[prop]).toEqual(DEFAULTS.player[prop])
      expect(pd({ [prop]: 15.5 })[prop]).toEqual(15)
      expect(pd({ [prop]: '15.5' })[prop]).toEqual(15)
      expect(pd({ [prop]: -10 })[prop]).toEqual(DEFAULTS.player[prop])
      expect(pd({ [prop]: null })[prop]).toEqual(DEFAULTS.player[prop])
      expect(pd({ [prop]: undefined })[prop]).toEqual(DEFAULTS.player[prop])
    })
  }

  testIntegerValue('time')
  testIntegerValue('health')
  testIntegerValue('money')

  test('location defaults to a valid location', () => {
    const pdl = (value) => pd({ location: value }).location
    const inDef = (value) => DEFAULTS.locations.indexOf(value) !== -1
    expect(inDef(pdl(undefined))).toBe(true)
    expect(inDef(pdl(null))).toBe(true)
    DEFAULTS.locations.forEach(location => {
      expect(inDef(pdl(location))).toBe(true)
    })
    expect(inDef(pdl('XXX'))).toBe(true)
    expect(inDef(pdl('XXX'))).not.toBe('XXX')
  })

  test('storage value is integer > 0', () => {
    const pds = (value) => pd({ storage: { value } }).storage.value
    expect(pds(100)).toBe(100)
    expect(pds()).toBe(100)
    expect(pds(-100)).toBe(0)
    expect(pds(50.5)).toBe(50)
  })

  test('storage has a valid property and value for each item', () => {
    const items = [
      { name: 'A', min: 15, max: 150 },
      { name: 'B', min: 100, max: 750 },
      { name: 'C', min: 300, max: 1500 },
    ]
    const pdf = (filled) => pd({ storage: { value: 100, filled } },
      { items }).storage.filled
    // Fall back to defaults:
    expect(pdf()).toEqual({ A: 0, B: 0, C: 0 })
    // Cast invalid to 0:
    expect(pdf({ A: -10, B: 'string', C: null })).toEqual({ A: 0, B: 0, C: 0 })
    // Remove invalid items (D), add necessary items (C):
    expect(pdf({ A: 15, B: 20, D: 50 })).toEqual({ A: 15, B: 20, C: 0 })
    // Prevent sum of values from exceeding storage.value (100):
    expect(pdf({ A: 90, B: 20, C: 10 })).toEqual({ A: 90, B: 10, C: 0 })
  })

  test('weapons are an array of valid weapon names', () => {
    const rootWeapons = {
      weapons: [{
        name: 'knife', power: 5, cost: 5, odds: 0.1,
      }, {
        name: 'gun', power: 15, cost: 15, odds: 0.1,
      }],
    }
    const pdw = (value) => pd({ weapons: value }, rootWeapons).weapons
    expect(pd().weapons).toEqual([])
    expect(pd(null).weapons).toEqual([])
    expect(pd('string').weapons).toEqual([])
    expect(pd(13).weapons).toEqual([])
    expect(pdw(['XXX'])).toEqual([])
    expect(pdw(['knife'])).toEqual(['knife'])
    expect(pdw(['gun', 'knife'])).toEqual(['gun', 'knife'])
    expect(pdw(['gun', 'XXX', 'knife'])).toEqual(['gun', 'knife'])
  })

  test('loan has valid principal, interest, amount', () => {
    const defLoan = Object.assign({}, DEFAULTS.player.loan,
      { amount: DEFAULTS.player.loan.principal })
    const pdl = (mergeObj) => pd({ loan: mergeObj }).loan
    expect(pdl()).toEqual(defLoan)
    expect(pdl({ principal: -1000 })).toEqual({
      principal: 0, interest: defLoan.interest, amount: 0,
    })
    expect(pdl({ principal: 0 })).toEqual({
      principal: 0, interest: defLoan.interest, amount: 0,
    })
    expect(pdl({ amount: 1000 })).toEqual(defLoan)
    expect(pdl({ principal: 1000, interest: -1 })).toEqual({
      principal: 1000, interest: 0, amount: 1000,
    })
    // `amount` always starts equal to `principal`:
    expect(pdl({ principal: 1000, interest: 0.1, amount: 2000 })).toEqual({
      principal: 1000, interest: 0.1, amount: 1000,
    })
  })
})
