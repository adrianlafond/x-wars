import merge from 'lodash.merge'
import options, {
  getRandomEventCommand,
} from '../src/options'

describe('options', () => {
  test('returns object', () => {
    expect(typeof options).toBe('function')
  })

  describe('getRandomEventCommand()', () => {
    const fn = getRandomEventCommand
    const random = {
      a: {
        enabled: true,
        data: { foo: 'bar' },
      },
      b: {
        enabled: true,
        data: { foo: 'bar' },
      },
      c: {
        enabled: false,
      },
      storage: {
        enabled: true,
        data: {
          multiply: 2,
          cost: 10,
        },
      },
    }
    const player = {
      storage: {
        value: 100,
        max: Number.MAX_VALUE,
        min: 0,
      },
    }

    test('time index out of bounds', () => {
      expect(fn(2, ['a', 'b'], random)).toEqual(null)
    })
    test('time index for non-event', () => {
      expect(fn(2, ['a', 'b', null], random)).toEqual(null)
    })

    test('storage returns current value * multiply', () => {
      expect(fn(1, ['a', 'storage'], random, player)).toEqual({
        name: 'buy',
        value: 'storage',
        units: 200,
        price: 2000,
      })
    })

    test('storage value constrained by max', () => {
      // Set a max < player.storage.value * storage.data.multiply:
      const player2 = merge({}, player, { storage: { max: 150 } })
      expect(fn(1, ['a', 'storage'], random, player2)).toEqual({
        name: 'buy',
        value: 'storage',
        units: 150,
        price: 1500,
      })
    })
  })
})
