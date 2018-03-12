import assign from 'lodash.assign'
import isFinite from 'lodash.isfinite'
import RandomBase from './random-base'

export default class RandomStorage extends RandomBase {
  constructor(config) {
    super(config)
    this.name = 'storage'
  }

  getSpecificData(base) {
    const offers = this.getOffers()
    return offers.length ? assign(base, { offers }) : this.getBase(false)
  }

  getOffers() {
    if (Array.isArray(this.config.offers)) {
      return this.config.offers.map(item => {
        const pockets = Math.floor(+item.pockets)
        const pocketsOk = isFinite(pockets) && pockets > 0
        const cost = +item.cost
        const costOk = pocketsOk && isFinite(cost) && cost > 0
        return costOk ? { pockets, cost } : null
      }).filter(item => item !== null).sort((a, b) => {
        const diff = a.pockets - b.pockets
        return (diff === 0) ? (a.cost - b.cost) : diff
      })
    }
    return this.getDefault().offers
  }
}
