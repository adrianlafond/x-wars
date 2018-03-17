import assign from 'lodash.assign'
import isFinite from 'lodash.isfinite'
import RandomBase from './random-base'

export default class RandomSupply extends RandomBase {
  constructor(config, name) {
    super(config)
    this.name = name
  }

  getSpecificData(base) {
    return assign(base, {
      min: this.validate('min'),
      max: this.validate('max'),
    })
  }

  validate(prop) {
    const value = this.config[prop]
    return (isFinite(value) && value >= 0) ? value : this.getDefault()[prop]
  }
}
