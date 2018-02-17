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
    expect(xwars.action().live).toEqual(true)
  })

  test('initial action() equals xwars.options', () => {
    expect(xwars.action()).toEqual(xwars.options)
  })

  test('action("reset") equals xwars.options', () => {
    const resetObj = xwars.action('reset')
    const optsObj = xwars.options
    expect(isPlainObject(resetObj)).toBe(true)
    expect(isPlainObject(optsObj)).toBe(true)
    expect(resetObj).toEqual(optsObj)
  })

  test('`action()` and `options` return identical object', () => {
    const playObj = xwars.action()
    const optsObj = xwars.options
    expect(isPlainObject(playObj)).toBe(true)
    expect(isPlainObject(optsObj)).toBe(true)
    expect(playObj).toEqual(optsObj)
  })

  test('action() returns valid current location', () => {
    const opts = xwars.action()
    const playerLoc = opts.player.location
    expect(opts.commands[playerLoc.value].data.name).toBe(playerLoc.name)
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

  test('action() "go" works to end of time; loan accumulates each day', () => {
    let time = DEFAULTS.player.time
    let opts = xwars.action()

    expect(opts.player.time).toBe(time)
    expect(opts.player.loans.length).toBe(1)

    let loan = opts.player.loans[0].principal
    const interest = opts.player.loans[0].interest

    while (opts.live) {
      const go = opts.commands.filter(cmd => cmd.name === 'go')
      const loc = go[Math.floor(Math.random() * go.length)].value
      opts = xwars.action('go', loc)
      expect(opts.commands.findIndex(cmd => cmd.name === 'reset')).not.toBe(-1)
      expect(opts.player.location.name).toBe(go[loc].data.name)
      expect(opts.player.location.value).toBe(loc)
      expect(opts.player.time).toBe(--time)

      loan += loan * interest
      expect(opts.player.loans[0].amount).toEqual(loan)
    }
    expect(opts.live).toBe(false)
    expect(xwars.action().player.time).toBe(time)
    expect(xwars.action().player.time).toBe(0)
  })

  test('undo() and redo()', () => {
    let opts = xwars.options
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', 1)
    expect(opts.player.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', 2)
    expect(opts.player.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('go', 3)
    expect(opts.player.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    opts = xwars.action('undo')
    expect(opts.player.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('undo')
    expect(opts.player.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('undo')
    expect(opts.player.time).toBe(30)
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    // Further undos have no effect.
    opts = xwars.action('undo')
    expect(opts.player.time).toBe(30)
    expect(opts.commands.findIndex(c => c.name === 'undo')).toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.player.time).toBe(29)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.player.time).toBe(28)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).not.toBe(-1)

    opts = xwars.action('redo')
    expect(opts.player.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)

    // Further redos have no effect.
    opts = xwars.action('redo')
    expect(opts.player.time).toBe(27)
    expect(opts.commands.findIndex(c => c.name === 'undo')).not.toBe(-1)
    expect(opts.commands.findIndex(c => c.name === 'redo')).toBe(-1)
  })
})
