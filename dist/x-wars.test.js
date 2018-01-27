import XWars from './x-wars'

/**
 * Test the API and ensure the build worked correctly.
**/

test('XWars is a function', () => {
  expect(typeof XWars).toBe('function')
})

const xwars = new XWars()

test('xwars.initialize is a function', () => {
  expect(typeof xwars.initialize).toBe('function')
})

test('config should be immutable', () => {
  const config = { foo: 'bar' }
  xwars.initialize(config)
  expect(xwars.get('config')).toEqual(config)
  expect(xwars.get('config')).not.toBe(config)
  config.foo = 'baz'
  expect(xwars.get('config')).not.toEqual(config)
})