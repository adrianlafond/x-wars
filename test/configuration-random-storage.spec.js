import cloneDeep from 'lodash.clonedeep'
import Storage from '../src/configuration/random-storage'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Storage', () => {
  //
  function defaults() {
    return cloneDeep(DEFAULTS.random.find(item => item.name === 'storage'))
  }

  function enabled(enabled = true) {
    return { name: 'storage', enabled }
  }

  function odds(odds = defaults().odds) {
    return { name: 'storage', odds }
  }

  function offers(offers = defaults().offers) {
    return { name: 'storage', offers }
  }

  function instance(config) {
    return new Storage(config).data
  }

  test('default', () => {
    expect(instance()).toEqual(defaults())
  })

  test('enabled:true', () => {
    expect(instance(enabled())).toEqual(defaults())
  })

  test('enabled:false', () => {
    expect(instance(enabled(false))).toEqual(enabled(false))
  })

  test('offers:invalid', () => {
    const array = [
      { pockets: 150 },
      { pockets: 200, cost: -500 },
      { pockets: -100, cost: 100 },
      { cost: 300 },
      {},
    ]
    expect(instance(offers(array))).toEqual(enabled(false))
  })

  test('offers:valid', () => {
    const array = [
      { pockets: 200, cost: 200 },
      { pockets: 200, cost: 175 },
      { pockets: 150, cost: 150 },
      { pockets: -100, cost: 100 },
      { cost: 300 },
      {},
    ]
    expect(instance(offers(array))).toEqual({
      name: 'storage',
      enabled: true,
      odds: defaults().odds,
      offers: [
        { pockets: 150, cost: 150 },
        { pockets: 200, cost: 175 },
        { pockets: 200, cost: 200 },
      ],
    })
  })

  test('odds', () => {
    expect(instance(odds()).odds).toEqual(defaults().odds)
    expect(instance(odds(-0.5)).odds).toEqual(defaults().odds)
    expect(instance(odds(2)).odds).toEqual(1)
    expect(instance(odds('string')).odds).toEqual(defaults().odds)
    expect(instance(odds(null)).odds).toEqual(defaults().odds)
  })
})
