import isPlainObject from 'lodash.isplainobject'
import assign from 'lodash.assign'
import isFinite from 'lodash.isfinite'
import DEFAULTS from '../defaults.json'

export default class RandomStorage {
  constructor(config = {}) {
    this.config = config
  }

  get data() {
    if (!isPlainObject(this.config) || this.config.name !== 'storage') {
      return getDefault()
    }
    if (this.config.enabled === false) {
      return getBase(false)
    }
    const defaults = getDefault()
    const base = getBase()
    const data = assign(base, {
      odds: getOdds(this.config.odds, defaults.odds),
      offers: getOffers(this.config.offers, defaults.offers),
    })
    return data.offers.length ? data : getBase(false)
  }
}

function getBase(enabled = true) {
  return { name: 'storage', enabled }
}

function getDefault() {
  return DEFAULTS.random.find(item => item.name === 'storage')
}

function getOdds(value, defaultValue) {
  const odds = +value
  if (isNaN(odds) || odds <= 0) {
    return defaultValue
  }
  return Math.min(1, odds)
}

function getOffers(value, defaultValue) {
  if (Array.isArray(value)) {
    return value.map(item => {
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
  return defaultValue
}
