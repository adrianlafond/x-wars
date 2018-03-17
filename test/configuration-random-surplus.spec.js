import cloneDeep from 'lodash.clonedeep'
import Supply from '../src/configuration/random-supply'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Surplus', () => {
  ['surplus', 'shortage'].forEach(event => {
    function defaults() {
      return cloneDeep(DEFAULTS.random[event])
    }
    function instance(config) {
      return new Supply(config, event).getData()
    }

    function testValid(prop) {
      expect(instance({ [prop]: 0 })[prop]).toEqual(0)
      expect(instance({ [prop]: 0.5 })[prop]).toEqual(0.5)
      expect(instance({ [prop]: 5 })[prop]).toEqual(5)
    }

    function testInvalid(prop) {
      expect(instance({ [prop]: -1 })[prop]).toEqual(defaults()[prop])
      expect(instance({ [prop]: 'string' })[prop]).toEqual(defaults()[prop])
      expect(instance({ [prop]: null })[prop]).toEqual(defaults()[prop])
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
