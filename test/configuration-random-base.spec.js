import cloneDeep from 'lodash.clonedeep'
import assign from 'lodash.assign'
import Storage from '../src/configuration/random-storage'
import Find from '../src/configuration/random-find'
import Surplus from '../src/configuration/random-surplus'
import Shortage from '../src/configuration/random-shortage'
import Police from '../src/configuration/random-police'
import Mugging from '../src/configuration/random-mugging'
import Rival from '../src/configuration/random-rival'
import Weapon from '../src/configuration/random-weapon'
import DEFAULTS from '../src/defaults'

describe('Configuration/Random/Base', () => {
  //
  const Events = [
    { name: 'storage', class: Storage },
    { name: 'find', class: Find },
    { name: 'surplus', class: Surplus },
    { name: 'shortage', class: Shortage },
    { name: 'police', class: Police },
    { name: 'mugging', class: Mugging },
    { name: 'rival', class: Rival },
    { name: 'weapon', class: Weapon },
  ]

  function defaults(prop) {
    return assign(cloneDeep(DEFAULTS.random[prop]), { name: prop })
  }

  function instance(Class, config) {
    return new Class(config).getData()
  }

  test('default', () => {
    Events.forEach(e => {
      expect(instance(e.class)).toEqual(defaults(e.name))
    })
  })

  test('enabled:true', () => {
    Events.forEach(e => {
      expect(instance(e.class, { enabled: true })).toEqual(defaults(e.name))
    })
  })

  test('odds', () => {
    Events.forEach(e => {
      const defaultOdds = defaults(e.name).odds
      expect(instance(e.class, { odds: defaultOdds }).odds).toEqual(defaultOdds)
      expect(instance(e.class, { odds: -0.5 }).odds).toEqual(defaultOdds)
      expect(instance(e.class, { odds: 2 }).odds).toEqual(1)
      expect(instance(e.class, { odds: 'string' }).odds).toEqual(defaultOdds)
      expect(instance(e.class, { odds: null }).odds).toEqual(defaultOdds)
    })
  })

  test('enabled:false', () => {
    Events.forEach(e => {
      expect(instance(e.class, { enabled: false })).toEqual(
        { name: e.name, enabled: false })
    })
  })
})
