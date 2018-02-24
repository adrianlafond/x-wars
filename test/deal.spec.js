import {// deal
  getItem,
  getCommand,
} from '../src/deal'
import DEFAULTS from '../src/defaults'

describe('deal', () => {
  test(`getItem() returns item from list based on name`, () => {
    const items = DEFAULTS.items
    expect(getItem(items[0].name, items)).toBe(items[0])
    expect(getItem('Not Found', items)).toBeNull()
  })

  test(`getCommand() returns command from list based on command name,
      item name`, () => {
    // const items = [
    //   { name: 'Booms', min: 15, max: 150 },
    //   { name: 'Whams', min: 100, max: 750 },
    //   { name: 'Bangs', min: 300, max: 1500 },
    // ]
    const commands = [
      { name: 'buy', value: 'Booms', price: 100, max: 50 },
      { name: 'buy', value: 'Whams', price: 300, max: 10 },
      { name: 'buy', value: 'Bangs', price: 500, max: 5 },
    ]
    expect(getCommand(commands, 'buy', 'Booms')).toBe(commands[0])
    expect(getCommand(commands, 'sell', 'Booms')).toBeNull()
    expect(getCommand(commands, 'buy', 'XXX')).toBeNull()
  })
})
