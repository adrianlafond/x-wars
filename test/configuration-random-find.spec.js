import cloneDeep from 'lodash.clonedeep'
import Find from '../src/configuration/random-find'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Find', () => {
  //
  function defaults() {
    return cloneDeep(DEFAULTS.random.find)
  }
  function instance(config) {
    return new Find(config).getData()
  }

  test('defaults', () => {
    expect(instance().minLowPriced).toEqual(defaults().minLowPriced)
    expect(instance().maxLowPriced).toEqual(defaults().maxLowPriced)
    expect(instance().minHighPriced).toEqual(defaults().minHighPriced)
    expect(instance().maxHighPriced).toEqual(defaults().maxHighPriced)
  })

  test('valid', () => {
    expect(instance({ minLowPriced: 99 }).minLowPriced).toEqual(99)
    expect(instance({ maxLowPriced: 999 }).maxLowPriced).toEqual(999)
    expect(instance({ minHighPriced: 99 }).minHighPriced).toEqual(99)
    expect(instance({ maxHighPriced: 999 }).maxHighPriced).toEqual(999)
  })

  test('invalid', () => {
    expect(instance({ minLowPriced: -99 }).minLowPriced).toEqual(defaults().minLowPriced)
    expect(instance({ maxLowPriced: 5 }).maxLowPriced).toEqual(defaults().minLowPriced)
    expect(instance({ maxLowPriced: -99 }).maxLowPriced).toEqual(defaults().maxLowPriced)
    expect(instance({ minHighPriced: -99 }).minHighPriced).toEqual(defaults().minHighPriced)
    expect(instance({ maxHighPriced: 5 }).maxHighPriced).toEqual(defaults().minHighPriced)
    expect(instance({ maxHighPriced: -99 }).maxHighPriced).toEqual(defaults().maxHighPriced)
  })
})
