import assign from 'lodash.assign'
import cloneDeep from 'lodash.clonedeep'
import DEFAULTS from './defaults.json'

/**
 *
 */
export default class Config {
  constructor(config) {
    this.config = assign({}, cloneDeep(DEFAULTS), cloneDeep(config))
  }

  get(prop) {
    switch (prop) {
      case 'defaults':
        return DEFAULTS
      default:
        return this.config[prop] || this.config
    }
  }

  set(prop, val) {
    //
  }
}
