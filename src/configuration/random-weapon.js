import assign from 'lodash.assign'
import isFinite from 'lodash.isfinite'
import isString from 'lodash.isstring'
import isPlainObject from 'lodash.isplainobject'
import RandomBase from './random-base'

export default class RandomWeapon extends RandomBase {
  constructor(config) {
    super(config)
    this.name = 'weapon'
  }

  getSpecificData(base) {
    return assign(base, {
      items: this.getItems(),
    })
  }

  getItems() {
    return (this.config.items || this.getDefault().items || []).map((item) => {
      let { name, power, cost } = item
      name = (name && isString(name)) ? name : null
      power = isPlainObject(power) ? {
        min: isFinite(power.min) ? Math.max(0, power.min) : 0,
        max: isFinite(power.max) ? Math.max(0, power.max) : 0,
      } : null
      power.max = Math.max(power.min, power.max)
      cost = isFinite(cost) ? Math.max(0, cost) : 0
      return {
        name,
        power,
        cost,
      }
    }).filter((item) => !!item.name)
  }
}
