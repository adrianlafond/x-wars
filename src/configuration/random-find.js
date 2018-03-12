import assign from 'lodash.assign'
import isFinite from 'lodash.isfinite'
import RandomBase from './random-base'

export default class RandomFind extends RandomBase {
  constructor(config) {
    super(config)
    this.name = 'find'
  }

  getSpecificData(base) {
    const minLowPriced = this.getMinPriced('minLowPriced')
    const maxLowPriced = this.getMaxLowPriced('maxLowPriced', minLowPriced)
    const minHighPriced = this.getMinPriced('minHighPriced')
    const maxHighPriced = this.getMaxLowPriced('maxHighPriced', minHighPriced)
    return assign(base, {
      minLowPriced,
      maxLowPriced,
      minHighPriced,
      maxHighPriced,
    })
  }

  getMinPriced(prop) {
    const value = +this.config[prop]
    return (isFinite(value) && value > 0) ? Math.floor(value)
      : this.getDefault()[prop]
  }

  getMaxLowPriced(prop, minPriced) {
    const value = +this.config[prop]
    return (isFinite(value) && value > 0)
      ? Math.max(Math.floor(value), minPriced)
      : this.getDefault()[prop]
  }
}
