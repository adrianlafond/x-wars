import isPlainObject from 'lodash.isplainobject'
import cloneDeep from 'lodash.clonedeep'
import Weapons from './Weapons'

const DATA = new WeakMap()
const WEAPONS = new WeakMap()

/**
 *
 */
export default class Player {
  constructor(initialData) {
    if (isPlainObject(initialData)) {
      const data = cloneDeep(initialData)
      DATA.set(this, data)

      // health
      data.health.min = Math.min(data.health.max, data.health.min)
      this.health = data.health.value

      // wealth
      data.wealth.min = (data.wealth.min === '*') ? Number.MIN_VALUE :
        data.wealth.min
      data.wealth.max = (data.wealth.max === '*') ? Number.MAX_VALUE :
        data.wealth.max
      data.wealth.min = Math.min(data.wealth.max, data.wealth.min)
      this.wealth = data.wealth.value

      // storage
      data.storage.min = (data.storage.min === '*') ? Number.MIN_VALUE :
        data.storage.min
      data.storage.max = (data.storage.max === '*') ? Number.MAX_VALUE :
        data.storage.max
      data.storage.min = Math.min(data.storage.max, data.storage.min)
      this.storage = data.storage.value

      // weapons
      const weapons = new Weapons(data.weapons)
      WEAPONS.set(this, weapons)
    } else {
      throw new Error('Player data must be type "object".')
    }
  }

  get health() {
    return DATA.get(this).health.value
  }

  set health(value) {
    const data = DATA.get(this)
    data.health.value = Math.max(data.health.min,
      Math.min(data.health.max, value))
  }

  get wealth() {
    return DATA.get(this).wealth.value
  }

  set wealth(value) {
    const data = DATA.get(this)
    data.wealth.value = Math.max(data.wealth.min,
      Math.min(data.wealth.max, value))
  }

  get storage() {
    return DATA.get(this).storage.value
  }

  set storage(value) {
    const data = DATA.get(this)
    data.storage.value = Math.max(data.storage.min,
      Math.min(data.storage.max, value))
  }
}
