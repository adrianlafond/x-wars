import assign from 'lodash.assign'
import cloneDeep from 'lodash.clonedeep'
import DEFAULTS from './defaults.json'

/**
 *
 */
export default class Config {
  constructor(config) {
    this.data = cloneDeep(assign({}, DEFAULTS, config))
    this.data.items.sort((a, b) => b.min - a.min)
  }

  get(prop) {
    switch (prop) {
      case 'defaults':
        return DEFAULTS
      default:
        return this.data[prop] || this.data
    }
  }

  set(prop, val) {
    //
  }
}
