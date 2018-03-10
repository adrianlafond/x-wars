import isPlainObject from 'lodash.isplainobject'
import isFinite from 'lodash.isfinite'
import DEFAULTS from '../defaults.json'

export default class Player {
  constructor(config = {}) {
    this.config = config
    this.data = {
      time: this.time(),
      location: this.location(),
      health: this.health(),
      money: this.money(),
      storage: this.storage(),
      loan: this.loan(),
      weapons: this.weapons(),
    }
  }

  time() {
    return this.configureIntegerValue('time', DEFAULTS.player.time, 1)
  }

  location() {
    const value = this.getString('location')
    if (this.config.locations.some(loc => loc === value)) {
      return value
    }
    const random = Math.floor(Math.random() * this.config.locations.length)
    return this.config.locations[random]
  }

  health() {
    return this.configureIntegerValue('health', DEFAULTS.player.health)
  }

  money() {
    return this.configureIntegerValue('money', DEFAULTS.player.money)
  }

  storage() {
    const defObj = {
      value: DEFAULTS.player.value,
      filled: {},
    }
    const storage = this.getObject('storage', defObj)
    storage.value = storageValue(storage.value)
    storage.filled = this.storageFilled(storage)
    return storage
  }

  storageFilled(storage) {
    const filledObj = {}
    this.config.items.forEach(item => {
      filledObj[item.name] = 0
    })
    const configObj = isPlainObject(storage.filled) ? storage.filled : {}
    configureStorageFilled(filledObj, configObj, storage.value)
    return filledObj
  }

  loan() {
    const loan = this.getObject('loan', DEFAULTS.player.loan)
    loan.principal = isFinite(loan.principal)
      ? Math.max(0, loan.principal) : DEFAULTS.player.loan.principal
    loan.interest = isFinite(loan.interest)
      ? Math.max(0, loan.interest) : DEFAULTS.player.loan.interest
    loan.amount = loan.principal
    return loan
  }

  weapons() {
    const weaponsArray = this.getArray('weapons')
      .filter(w => this.config.weapons.some(obj => obj.name === w))
    return weaponsArray
  }

  configureIntegerValue(prop, defaultValue = 0, minValue = 0) {
    let value = this.getNumber(prop, DEFAULTS.player[prop])
    if (value < minValue) {
      value = DEFAULTS.player[prop]
    }
    return Math.floor(value)
  }

  getPlayer() {
    return isPlainObject(this.config.player) ? this.config.player : {}
  }

  getNumber(prop, defaultValue = 0) {
    const value = this.getPlayer()[prop]
    return (value === null || isNaN(value)) ? defaultValue : value
  }

  getString(prop, defaultValue = null) {
    const value = this.getPlayer()[prop]
    return (value && typeof value === 'string') ? value : defaultValue
  }

  getObject(prop, defaultValue = {}) {
    const value = this.getPlayer()[prop]
    return isPlainObject(value) ? value : defaultValue
  }

  getArray(prop, defaultValue = []) {
    const value = this.getPlayer()[prop]
    return Array.isArray(value) ? value : defaultValue
  }
}

function storageValue(value) {
  return Math.floor(Math.max(0, isFinite(+value) ? +value
    : DEFAULTS.player.storage.value))
}

function configureStorageFilled(filledObj, configObj, totalValue) {
  let sum = 0
  Object.keys(configObj).forEach(key => {
    if (filledObj.hasOwnProperty(key)) {
      let value = +configObj[key]
      if (isFinite(value) && value >= 0 && sum < totalValue) {
        sum += Math.floor(value)
        if (sum > totalValue) {
          value = sum - totalValue
        }
        filledObj[key] = Math.floor(value)
      }
    }
  })
}
