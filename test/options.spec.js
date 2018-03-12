import isPlainObject from 'lodash.isplainobject'
import Options from '../src/options'
import State from '../src/state'

describe('options', () => {
  test('options has info and commands', () => {
    const options = new Options(new State()).options
    expect(isPlainObject(options.info)).toBe(true)
    expect(Array.isArray(options.commands)).toBe(true)
  })
  // describe('getRandomEventCommand()', () => {
  //   const fn = testFns.getRandomEventCommand
  //   const random = {
  //     a: {
  //       enabled: true,
  //       data: { foo: 'bar' },
  //     },
  //     b: {
  //       enabled: true,
  //       data: { foo: 'bar' },
  //     },
  //     c: {
  //       enabled: false,
  //     },
  //     storage: {
  //       enabled: true,
  //       data: {
  //         multiply: 2,
  //         cost: 10,
  //       },
  //     },
  //   }
  //   const player = {
  //     storage: {
  //       value: 100,
  //       max: Number.MAX_VALUE,
  //       min: 0,
  //     },
  //   }

  //   test('time index out of bounds', () => {
  //     expect(fn(2, ['a', 'b'], random)).toEqual(null)
  //   })
  //   test('time index for non-event', () => {
  //     expect(fn(2, ['a', 'b', null], random)).toEqual(null)
  //   })

  //   test('storage returns current value * multiply', () => {
  //     expect(fn(1, ['a', 'storage'], random, player)).toEqual({
  //       name: 'buy',
  //       value: 'storage',
  //       units: 200,
  //       price: 2000,
  //     })
  //   })

  //   test('storage value constrained by max', () => {
  //     // Set a max < player.storage.value * storage.data.multiply:
  //     const player2 = merge({}, player, { storage: { max: 150 } })
  //     expect(fn(1, ['a', 'storage'], random, player2)).toEqual({
  //       name: 'buy',
  //       value: 'storage',
  //       units: 150,
  //       price: 1500,
  //     })
  //   })
  // })
})
