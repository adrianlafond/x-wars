import XWars from '../src'

test('sanity', () => {
  expect(typeof XWars).toBe('function')
})

const methods = [
  'initialize',
  'start',
  'reset',
  'quit',
  'do',
  'back',
  'forward',
  'go',
  'set',
  'get',
]
const xwars = new XWars()

test('api:initialize', () => {
  expect(typeof xwars.initialize).toBe('function')
})

test('api:methods', () => {
  methods.forEach(method => {
    expect(typeof xwars[method]).toBe('function')
  })
})

test('api:start', () => {
  expect(xwars.start()).toEqual(undefined)
})
