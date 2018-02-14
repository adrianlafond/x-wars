import isPlainObject from 'lodash.isplainobject'
import XWars from '../src'
import DEFAULTS from '../src/defaults'

describe('XWars:basics', () => {
  test('sanity', () => {
    expect(typeof XWars).toBe('function')
  })

  let xwars
  beforeEach(() => {
    xwars = new XWars()
  })

  test('reset returns instance (for chaining)', () => {
    expect(xwars.reset()).toBe(xwars)
  })

  test('`play()` and `options` return identical object', () => {
    const playObj = xwars.play()
    const optsObj = xwars.options
    expect(isPlainObject(playObj)).toBe(true)
    expect(isPlainObject(optsObj)).toBe(true)
    expect(playObj).toEqual(optsObj)
  })

  test('play() returns valid current location', () => {
    const opts = xwars.play()
    const playerLoc = opts.player.location
    expect(opts.commands[playerLoc.value].data.name).toBe(playerLoc.name)
  })

  test('play() returns valid commands', () => {
    const { commands } = xwars.play()
    expect(Array.isArray(commands)).toBe(true)
    expect(commands.length).toBeGreaterThanOrEqual(1)
    commands.forEach((item, index) => {
      expect(typeof item.name).toBe('string')
      expect(item.name).toBeTruthy()
    })
  })

  test('play() go works to end of time', () => {
    let opts = xwars.play()
    expect(xwars.play().player.time).toBe(DEFAULTS.player.time)
    while (opts.commands.length) {
      const go = opts.commands.filter(cmd => cmd.name === 'go')
      const loc = go[Math.floor(Math.random() * go.length)].value
      opts = xwars.play('go', loc)
      expect(opts.player.location).toBe(go[loc].data.name)
    }
    expect(xwars.play().player.time).toBe(0)
  })
})
