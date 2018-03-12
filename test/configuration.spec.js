import Immutable from 'seamless-immutable'
import Configuration from '../src/configuration'

describe('Configuration.original', () => {
  test('stores original config', () => {
    const original = {}
    const config = new Configuration(original)
    expect(config.original).toBe(original)
  })
})

describe('Configuration', () => {
  let config
  beforeEach(() => {
    config = new Configuration()
  })

  test('data is not immutable', () => {
    expect(Immutable.isImmutable(config.data)).toBe(false)
  })
})
