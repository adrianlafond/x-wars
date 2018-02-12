import isPlainObject from 'lodash.isplainobject'
import XWars from '../src'

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
    expect(opts.go[playerLoc.value].data.name).toBe(playerLoc.name)
  })

  test('play() returns valid go options', () => {
    const opts = xwars.play()
    expect(Array.isArray(opts.go)).toBe(true)
    expect(opts.go.length).toBeGreaterThan(1)
    opts.go.forEach((item, index) => {
      expect(typeof item.data.name).toBe('string')
      expect(item.data.name).toBeTruthy()
      expect(item.value).toBe(index)
    })
  })

  // test('play', () => {
  //   expect(xwars.play('a', 'b', 'c')).toEqual('?')
  // })
})
