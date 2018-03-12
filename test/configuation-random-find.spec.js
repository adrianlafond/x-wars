import cloneDeep from 'lodash.clonedeep'
import Find from '../src/configuration/random-find'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Find', () => {
  //
  function defaults() {
    return cloneDeep(DEFAULTS.random.find(item => item.name === 'find'))
  }

  function enabled(enabled = true) {
    return { name: 'find', enabled }
  }

  function odds(odds = defaults().odds) {
    return { name: 'find', odds }
  }

  function instance(config) {
    return new Find(config).getData()
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
})
