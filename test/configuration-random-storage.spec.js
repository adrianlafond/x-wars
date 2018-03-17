import cloneDeep from 'lodash.clonedeep'
import Storage from '../src/configuration/random-storage'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Storage', () => {
  //
  function defaults() {
    return cloneDeep(DEFAULTS.random.storage)
  }

  function offers(offers = defaults().offers) {
    return { offers }
  }

  function instance(config) {
    return new Storage(config).getData()
  }

  test('offers:invalid', () => {
    const array = [
      { pockets: 150 },
      { pockets: 200, cost: -500 },
      { pockets: -100, cost: 100 },
      { cost: 300 },
      {},
    ]
    expect(instance(offers(array))).toEqual({ enabled: false })
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
      enabled: true,
      odds: defaults().odds,
      offers: [
        { pockets: 150, cost: 150 },
        { pockets: 200, cost: 175 },
        { pockets: 200, cost: 200 },
      ],
    })
  })
})
