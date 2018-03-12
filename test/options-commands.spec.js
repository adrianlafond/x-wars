import OptionsCommands from '../src/options-commands'
import State from '../src/state'

function getCommandsByName(commands, name) {
  return commands.filter(c => c.name === name)
}
test('getCommandsByName()', () => {
  const commands = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'a' }]
  expect(getCommandsByName(commands, 'a').length).toBe(2)
  expect(getCommandsByName(commands, 'b').length).toBe(1)
  expect(getCommandsByName(commands, 'c').length).toBe(1)
  expect(getCommandsByName(commands, 'x').length).toBe(0)
})

describe('options.info', () => {
  let state
  let commands
  beforeEach(() => {
    state = new State()
    commands = new OptionsCommands(state).commands
  })

  test('base commands: reset, undo, redo', () => {
    expect(commands.length).toBeGreaterThanOrEqual(1)
    expect(getCommandsByName(commands, 'reset').length).toBe(1)
    expect(getCommandsByName(commands, 'undo').length).toBe(0)
    expect(getCommandsByName(commands, 'redo').length).toBe(0)
    state.update(state.current)
    commands = new OptionsCommands(state).commands
    expect(getCommandsByName(commands, 'reset').length).toBe(1)
    expect(getCommandsByName(commands, 'undo').length).toBe(1)
    expect(getCommandsByName(commands, 'redo').length).toBe(0)
    state.undo()
    commands = new OptionsCommands(state).commands
    expect(getCommandsByName(commands, 'reset').length).toBe(1)
    expect(getCommandsByName(commands, 'undo').length).toBe(0)
    expect(getCommandsByName(commands, 'redo').length).toBe(1)
    state.redo()
    commands = new OptionsCommands(state).commands
    expect(getCommandsByName(commands, 'reset').length).toBe(1)
    expect(getCommandsByName(commands, 'undo').length).toBe(1)
    expect(getCommandsByName(commands, 'redo').length).toBe(0)
  })

  test('loan commands', () => {
    const { loan, money } = state.current.player
    const pay = getCommandsByName(commands, 'pay')[0]
    // const borrow = getCommandsByName(commands, 'borrow')[0]
    expect(getCommandsByName(commands, 'pay').length).toBe(1)
    expect(getCommandsByName(commands, 'borrow').length).toBe(1)
    expect(pay.max).toBe(Math.min(money, loan.amount))
  })
})
