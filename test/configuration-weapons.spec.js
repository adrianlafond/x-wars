import Weapons from '../src/configuration/weapons'
import DEFAULTS from '../src/defaults'

describe('Configuration/Weapons', () => {

  function w(weapons) {
    return new Weapons({ weapons }).data
  }

  test('returns [] if weapons are not defined', () => {
    expect(w()).toEqual([])
    expect(w([])).toEqual([])
    expect(w(null)).toEqual([])
    expect(w('string')).toEqual([])
    expect(w(77)).toEqual([])
  })

  test('returns valid, non-duplicated weapons if defined', () => {
    expect(w([
      {
        name: 'A',
        power: 10,
        cost: 100,
        // Odds will default to 0.1
      },
      {
        // Duplicated name!
        name: 'A',
        power: 50,
        cost: 500,
        odds: 0.1,
      },
      {
        // No name!
        power: 5,
        cost: 50,
        odds: 0.1,
      },
      {
        name: 'B',
        power: { max: 50 },
        cost: { max: 50 },
      },
      {
        name: 'C',
        power: { min: 50 }, // No max power!
        cost: { max: 50 },
      },
      {
        name: 'D',
        power: { max: 50 },
        cost: { min: 50 }, // No max cost!
      },
      {
        name: 'E',
        // No power!
        cost: { max: 50 },
      },
      {
        name: 'F',
        power: 100,
        // No cost!
      },
      {
        name: 'G',
        power: 500,
        cost: 500,
        odds: 0, // Odds must be undefined or > 0!
      },
      {
        name: 'H',
        power: 500,
        cost: 500,
        odds: -0.5, // Odds must be undefined or > 0!
      },
      {
        name: 'I',
        power: 500,
        cost: 500,
        odds: 5,
      },
      {
        name: 'J',
        power: 500,
        cost: 500,
        odds: '5', // Will be cast to number, maxed to 1
      },
    ])).toEqual([
      {
        name: 'A',
        power: 10,
        cost: 100,
        odds: 0.1,
      },
      {
        name: 'B',
        power: { min: 0, max: 50 },
        cost: { min: 0, max: 50 },
        odds: 0.1,
      },
      {
        name: 'I',
        power: 500,
        cost: 500,
        odds: 1,
      },
      {
        name: 'J',
        power: 500,
        cost: 500,
        odds: 1,
      },
    ])
  })
})
