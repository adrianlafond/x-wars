import isPlainObject from 'lodash.isplainobject'
import isFinite from 'lodash.isfinite'
import DEFAULTS from '../defaults.json'

export default class Items {
  constructor(config = {}) {
    this.config = config
  }

  get data() {
    const array = (Array.isArray(this.config.items)
      && this.config.items.length)
      ? this.config.items
      : DEFAULTS.items

    const valid = updateValid(getValid(array))
    const unique = ensureUnqiue(valid)

    return calculatePrices(unique.length ? unique : DEFAULTS.items)
  }
}

export function getItemPrice(item) {
  return item.min + Math.floor(Math.random() * (item.max - item.min))
}

function calculatePrices(items) {
  items.forEach(item => {
    item.price = getItemPrice(item)
  })
  return items
}

function getValid(array) {
  return array.filter(item => {
    return !!(
      isPlainObject(item)
      && item.name
      && typeof item.name === 'string'
      && isFinite(+item.max)
    )
  })
}

function updateValid(array) {
  return array.map(item => {
    item.max = Math.max(0, +item.max)
    item.min = Math.max(0, +item.min)
    if (isNaN(item.min)) {
      item.min = 0
    }
    item.max = Math.max(item.max, item.min)
    return item
  })
}

function ensureUnqiue(array) {
  return array.reduce((unique, item) => {
    if (!unique.some(i => i.name === item.name)) {
      unique.push(item)
    }
    return unique
  }, [])
}
