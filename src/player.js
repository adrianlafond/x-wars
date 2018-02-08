import isPlainObject from 'lodash.isplainobject'

/**
 *
 */
export default class Player {
  constructor(data) {
    if (isPlainObject(data)) {
      this.data = data

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

    } else {
      throw new Error('Player data must be type "object".')
    }
  }

  get health() {
    return this.data.health.value
  }

  set health(value) {
    this.data.health.value = Math.max(this.data.health.min,
      Math.min(this.data.health.max, value))
  }

  get wealth() {
    return this.data.wealth.value
  }

  set wealth(value) {
    this.data.wealth.value = Math.max(this.data.wealth.min,
      Math.min(this.data.wealth.max, value))
  }
}
