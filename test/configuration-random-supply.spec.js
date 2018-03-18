import cloneDeep from 'lodash.clonedeep'
import Surplus from '../src/configuration/random-surplus'
import Shortage from '../src/configuration/random-shortage'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Supply', () => {
  ['surplus', 'shortage'].forEach(event => {
    function defaults() {
      return cloneDeep(DEFAULTS.random[event])
    }

    function instance(config) {
      return (event === 'surplus')
        ? new Surplus(config).getData()
        : new Shortage(config).getData()
    }

    function testValid(prop) {
      expect(instance({ [prop]: 0 })[prop]).toEqual(0)
      expect(instance({ [prop]: 0.5 })[prop]).toEqual(0.5)
      expect(instance({ [prop]: 5 })[prop]).toEqual(5)
      expect(instance({ [prop]: null })[prop]).toEqual(0)
    }

    function testInvalid(prop) {
      expect(instance({ [prop]: -1 })[prop]).toEqual(defaults()[prop])
      expect(instance({ [prop]: 'string' })[prop]).toEqual(defaults()[prop])
      expect(instance({ [prop]: 0 / 0 })[prop]).toEqual(defaults()[prop])
      expect(instance({ [prop]: undefined })[prop]).toEqual(defaults()[prop])
    }

    test('defaults', () => {
      expect(instance().min).toEqual(defaults().min)
      expect(instance().max).toEqual(defaults().max)
    })

    test('valid:min', () => {
      testValid('min')
    })

    test('valid:max', () => {
      testValid('max')
    })

    test('invalid:min', () => {
      testInvalid('min')
    })

    test('invalid:max', () => {
      testInvalid('max')
    })
  })
})
