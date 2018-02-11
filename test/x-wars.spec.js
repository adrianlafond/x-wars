import isPlainObject from 'lodash.isplainobject'
import XWars from '../src'

describe('XWars', () => {
  test('sanity', () => {
    expect(typeof XWars).toBe('function')
  })

  const xwars = new XWars()

  test('reset returns instance (for chaining)', () => {
    expect(xwars.reset()).toBe(xwars)
  })

  test('play() returns type object', () => {
    expect(isPlainObject(xwars.play())).toBe(true)
  })

  test('xwars.state returns type object', () => {
    expect(isPlainObject(xwars.state)).toBe(true)
  })

  // test('play', () => {
  //   expect(xwars.play('a', 'b', 'c')).toEqual('?')
  // })
})
