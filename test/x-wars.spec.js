import isPlainObject from 'lodash.isplainobject'
import XWars from '../src'
import DEFAULTS from '../src/defaults'

describe('XWars:basics', () => {
  test('sanity', () => {
    expect(typeof XWars).toBe('function')
  })

  let xwars
  beforeEach(() => {
    const config = Object.assign({}, DEFAULTS, {
      adversaries: [],
      random: [],
    })
    xwars = new XWars(config)
  })

  test('initial action() to return "live"', () => {
    expect(xwars.action().info.live).toEqual(true)
  })

  test('`action()` and `options` return identical object', () => {
    const playObj = xwars.action()
    const optsObj = xwars.options
    expect(isPlainObject(playObj)).toBe(true)
    expect(isPlainObject(optsObj)).toBe(true)
    expect(playObj).toEqual(optsObj)
  })

  test('action("reset") equals xwars.options', () => {
    const resetObj = xwars.action('reset')
    const optsObj = xwars.options
    expect(isPlainObject(resetObj)).toBe(true)
    expect(isPlainObject(optsObj)).toBe(true)
    expect(resetObj).toEqual(optsObj)
  })

  test('action() returns valid current location', () => {
    const opts = xwars.action()
    const location = opts.info.location
    const command = opts.commands.find(c => c.value === location)
    expect(command.value).toBe(location)
  })

  test('action() returns valid commands', () => {
    const { commands } = xwars.action()
    expect(Array.isArray(commands)).toBe(true)
    expect(commands.length).toBeGreaterThanOrEqual(1)
    commands.forEach((item, index) => {
      expect(typeof item.name).toBe('string')
      expect(item.name).toBeTruthy()
    })
  })

  test('action() "buy" max', () => {
    let opts = xwars.options
    const buy = opts.commands
      .filter(c => c.name === 'buy')
      .filter(c => c.max > 0)[0]
    opts = xwars.action('buy', buy.value, buy.max)
    expect(opts.info.storage.filled[buy.value]).toEqual(buy.max)
  })

  test('action() "buy" -100 = buying 0', () => {
    let opts = xwars.options
    const buy = opts.commands
      .filter(c => c.name === 'buy')
      .filter(c => c.max > 0)[0]
    opts = xwars.action('buy', buy.value, -100)
    expect(opts.info.storage.filled[buy.value]).toEqual(0)
  })

  test('action() "buy" +100 = buying max', () => {
    let opts = xwars.options
    const buy = opts.commands
      .filter(c => c.name === 'buy')
      .filter(c => c.max > 0)[0]
    opts = xwars.action('buy', buy.value, buy.max + 100)
    expect(opts.info.storage.filled[buy.value]).toEqual(buy.max)
  })

  test('action() "buy" item with max 0 = not possible', () => {
    let opts = xwars.options
    const buy = opts.commands
      .filter(c => c.name === 'buy')
      .filter(c => c.max === 0)[0]
    opts = xwars.action('buy', buy.value, 100)
    expect(opts.info.storage.filled[buy.value]).toEqual(0)
  })

  test('action() "buy" non-existent item = not possible', () => {
    let opts = xwars.options
    opts = xwars.action('buy', 'Non Existent Item', 1)
    expect(opts.info.storage.filled['Non Existent Item']).toBeUndefined()
  })

  test('action() "go" works to end of time; loan accumulates each day', () => {
    let time = DEFAULTS.player.time
    let opts = xwars.action()

    expect(opts.info.time).toBe(time)
    expect(opts.info.loans.length).toBe(DEFAULTS.player.loans.length)

    let loan = opts.info.loans[0].principal
    let loc
    const interest = opts.info.loans[0].interest
    const goLen = DEFAULTS.locations.length
    const buyLen = DEFAULTS.items.length

    while (opts.info.live) {
      const go = opts.commands.filter(cmd => cmd.name === 'go')
      if (go.length) {
        loc = go[Math.floor(Math.random() * go.length)].value
        expect(go.length).toBe(goLen)
        opts = xwars.action('go', loc)
        expect(opts.info.time).toBe(--time)
      }
      expect(opts.commands.filter(cmd => cmd.name === 'buy').length).toBe(buyLen)
      expect(opts.commands.findIndex(cmd => cmd.name === 'reset')).not.toBe(-1)
      expect(opts.info.location).toBe(loc)
      loan += loan * interest
      expect(opts.info.loans[0].amount).toEqual(loan)
      if (opts.commands.some(cmd => cmd.name === 'finish')) {
        opts = xwars.action('finish')
        --time
      }
    }

    expect(opts.info.live).toBe(false)
    expect(xwars.action().info.time).toBe(time)
    expect(xwars.action().info.time).toBe(0)
    expect(opts.commands.filter(cmd => cmd.name === 'go').length).toBe(0)
    expect(opts.commands.filter(cmd => cmd.name === 'buy').length).toBe(0)
  })

  test('undo() and redo()', () => {
    const go = (opts) => opts.commands.filter(c => c.name === 'go')

    let opts = xwars.options
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', go(opts)[0].value)
    expect(opts.info.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', go(opts)[1].value)
    expect(opts.info.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', go(opts)[2].value)
    expect(opts.info.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('undo')
    expect(opts.info.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('undo')
    expect(opts.info.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('undo')
    expect(opts.info.time).toBe(30)
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    // Further undos have no effect.
    opts = xwars.action('undo')
    expect(opts.info.time).toBe(30)
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.info.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.info.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.info.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    // Further redos have no effect.
    opts = xwars.action('redo')
    expect(opts.info.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)
  })
})
