import assign from 'lodash.assign'
import RandomBase from './random-base'

export default class RandomEnemy extends RandomBase {
  getSpecificData(base) {
    return assign(base, {
      health: this.validate('health'),
      damage: this.validate('damage'),
    })
  }

  validate(prop) {
    const value = +this.config[prop]
    return (isFinite(value) && value >= 0) ? value : this.getDefault()[prop]
  }
}
