import cloneDeep from 'lodash.clonedeep'
import Police from '../src/configuration/random-police'
import Mugging from '../src/configuration/random-mugging'
import Rival from '../src/configuration/random-rival'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Supply', () => {
  ['police', 'mugging', "rival"].forEach(event => {
    function defaults() {
      return cloneDeep(DEFAULTS.random[event])
    }

    function instance(config) {
      switch (event) {
        case 'police':
          return new Police(config).getData()
        case 'mugging':
          return new Mugging(config).getData()
        case 'rival':
          return new Rival(config).getData()
        default:
          return null
      }
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

    test('instantiates class', () => {
      const ClassName = (() => {
        switch (event) {
          case 'police':
            return Police
          case 'mugging':
            return Mugging
          case 'rival':
            return Rival
          default:
            return null
        }
      })()
      expect(new ClassName().name).toEqual(event)
    })

    test('defaults', () => {
      expect(instance().health).toEqual(defaults().health)
      expect(instance().damage).toEqual(defaults().damage)
    })

    test('valid:health', () => {
      testValid('health')
    })

    test('valid:damage', () => {
      testValid('damage')
    })

    test('invalid:health', () => {
      testInvalid('health')
    })

    test('invalid:damage', () => {
      testInvalid('damage')
    })
  })
})
