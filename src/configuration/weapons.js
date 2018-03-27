import isPlainObject from 'lodash.isplainobject'
import isFinite from 'lodash.isfinite'

export default class Weapons {
  constructor(config = {}) {
    this.config = config
  }

  get data() {
    if (Array.isArray(this.config.weapons)) {
      return validWeapons(this.config.weapons)
    }
    return []
  }
}

function validWeapons(weapons) {
  return filterWeapons(weapons).reduce((array, weapon) => {
    if (!array.some(w => w.name === weapon.name)) {
      weapon.power = makeValidProp(weapon.power)
      weapon.cost = makeValidProp(weapon.cost)
      weapon.odds = makeValidOdds(weapon.odds)
      array.push(weapon)
    }
    return array
  }, [])
}

function filterWeapons(weapons) {
  return weapons.filter(weapon => (
    hasName(weapon)
    && hasNumberValue(weapon.power)
    && hasNumberValue(weapon.cost)
    && hasNonZeroOdds(weapon.odds)
  ))
}

function hasName(weapon) {
  return weapon.name && typeof weapon.name === 'string'
}

function hasNumberValue(value) {
  if (isFinite(+value) && +value > 0) {
    return true
  }
  if (isPlainObject(value)) {
    return isFinite(+value.max) && +value.max > 0
  }
  return false
}

function hasNonZeroOdds(value) {
  return (isFinite(+value) && +value > 0) || !isFinite(value)
}

function makeValidProp(value) {
  if (isFinite(+value)) {
    return +value
  }
  value.max = +value.max
  value.min = Math.max(0, Math.min(value.max, +value.min || 0))
  if (value.min === value.max) {
    return value.max
  }
  return value
}

function makeValidOdds(odds) {
  if (isFinite(+odds)) {
    return Math.min(1, Math.max(0, +odds))
  }
  return 0.1
}
