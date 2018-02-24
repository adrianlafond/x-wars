import rewire from 'rewire';
import Immutable from 'seamless-immutable'
import merge from 'lodash.merge'
import Options from '../src/options'
import State from '../src/state'

function getCommandsByName(commands, name) {
  return commands.filter(c => c.name === name)
}
test('getCommandsByName()', () => {
  const cmds = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'a' }]
  expect(getCommandsByName(cmds, 'a').length).toBe(2)
  expect(getCommandsByName(cmds, 'b').length).toBe(1)
  expect(getCommandsByName(cmds, 'c').length).toBe(1)
  expect(getCommandsByName(cmds, 'x').length).toBe(0)
})

describe('options', () => {
  let state
  let instance
  let options
  beforeEach(() => {
    state = new State()
    instance = new Options(state)
    options = instance.options
  })

  test('isLive()', () => {
    expect(instance.isLive()).toBe(true)
  })

  test('score', () => {
    const p1 = {
      bank: { value: 25000000 },
      cash: { value: 0 },
    }
    expect(instance.getScore(p1)).toBe(50)
    const p2 = {
      bank: { value: 0 },
      cash: { value: 25000000 },
    }
    expect(instance.getScore(p2)).toBe(50)
    const p3 = {
      bank: { value: 30000000 },
      cash: { value: 30000000 },
    }
    expect(instance.getScore(p3)).toBe(100)
    const p4 = {
      bank: { value: 500 },
      cash: { value: 500 },
    }
    expect(instance.getScore(p4)).toBe(0)
  })

  test('createBaseCommands(): reset, undo, redo', () => {
    let cmds = options.commands
    expect(cmds.length).toBeGreaterThanOrEqual(1)
    expect(getCommandsByName(cmds, 'reset').length).toBe(1)
    expect(getCommandsByName(cmds, 'undo').length).toBe(0)
    expect(getCommandsByName(cmds, 'redo').length).toBe(0)
    state.update(state.current)
    cmds = new Options(state).options.commands
    expect(getCommandsByName(cmds, 'reset').length).toBe(1)
    expect(getCommandsByName(cmds, 'undo').length).toBe(1)
    expect(getCommandsByName(cmds, 'redo').length).toBe(0)
    state.undo()
    cmds = new Options(state).options.commands
    expect(getCommandsByName(cmds, 'reset').length).toBe(1)
    expect(getCommandsByName(cmds, 'undo').length).toBe(0)
    expect(getCommandsByName(cmds, 'redo').length).toBe(1)
    state.redo()
    cmds = new Options(state).options.commands
    expect(getCommandsByName(cmds, 'reset').length).toBe(1)
    expect(getCommandsByName(cmds, 'undo').length).toBe(1)
    expect(getCommandsByName(cmds, 'redo').length).toBe(0)
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
