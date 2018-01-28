import DEFAULTS from './defaults.json'

/**
 *
 */
export default class Config {
  constructor(config) {
    this.config = config
  }

  get(prop) {
    switch (prop) {
      case 'defaults':
        return DEFAULTS
      default:
        return this.config
    }
  }

  set(prop, val) {
    //
  }
}
