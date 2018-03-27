import assign from 'lodash.assign'
import isPlainObject from 'lodash.isplainobject'
import DEFAULTS from '../defaults.json'

export default class RandomBase {
  constructor(config) {
    this.config = config
    this.defaults = null
  }

  getData() {
    if (!isPlainObject(this.config)) {
      return this.getDefault()
    }
    if (this.config.enabled === false) {
      return this.getBase(false)
    }
    const base = assign(this.getBase(), { odds: this.getOdds() })
    return this.getSpecificData(base)
  }

  getSpecificData(base) {
    return base
  }

  getBase(enabled = true) {
    const name = this.name
    return { name, enabled }
  }

  getDefault() {
    const name = this.name
    this.defaults = assign({}, this.defaults || DEFAULTS.random[this.name],
      { name })
    return this.defaults
  }

  getOdds() {
    const odds = +this.config.odds
    if (isNaN(odds) || odds <= 0) {
      return this.getDefault().odds
    }
    return Math.max(0, Math.min(1, odds))
  }
}
