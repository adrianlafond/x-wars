import isPlainObject from 'lodash.isplainobject'
import isFinite from 'lodash.isfinite'
import assign from 'lodash.assign'
import range from 'lodash.range'
import DEFAULTS from './defaults.json'

/*******************************************************************************
 * Ensure initial configuration is valid.
 ******************************************************************************/
export default function configure(state = null) {
  // Ensure state is a plain object.
  state = (state && state.asMutable) ? state.asMutable() : (state || DEFAULTS)
  state.time = configureTime(state.time)
  state.locations = configureLocations(state.locations)
  state.items = configureItems(state)
  state.player = configurePlayer(state)
  state.events = configureRandomEvents(state)
  return state || DEFAULTS
}

export function configureItems(state) {
  return calculateItemPrices(state.items || DEFAULTS.items)
}

export function calculateItemPrices(items) {
  return items.map(item => (
    assign({}, item, {
      price: item.min + Math.floor(Math.random() * (item.max - item.min)),
    })
  ))
}

export function configureTime(time) {
  time = +time
  if (isNaN(time) || time < 1) {
    time = DEFAULTS.player.time
  }
  return Math.floor(time)
}

export function configureLocations(locations) {
  if (!Array.isArray(locations)) {
    locations = DEFAULTS.locations
  }
  for (let i = locations.length - 1; i >= 0; i--) {
    if (typeof locations[i] !== 'string' || !locations[i]) {
      locations.splice(i, 1)
    }
  }
  // Ensure location names are unique:
  locations = locations.filter((loc, index, array) => {
    for (let i = 0; i < index; i++) {
      if (array[i] === loc) {
        return false
      }
    }
    return true
  })
  // Ensure locations.length >= 2 by filling with default locations:
  while (locations.length < 2) {
    locations.push(DEFAULTS.locations[locations.length])
  }
  return locations
}

export function configurePlayerLoans(loans) {
  loans = Array.isArray(loans) ? loans : DEFAULTS.player.loans
  loans.forEach(loan => {
    if (!isFinite(loan.principal) || loan.principal < 0) {
      loan.principal = 0
    }
    if (!isFinite(loan.interest) || loan.interest < 0) {
      loan.interest = 0
    }
    loan.amount = loan.principal
  })
  return loans.filter(loan => loan.amount > 0)
}

export function configurePlayerLocation(playerLoc, locations) {
  if (playerLoc && typeof playerLoc === 'string'
      && locations.indexOf(playerLoc) !== -1) {
    return playerLoc
  }
  const random = Math.floor(Math.random() * locations.length)
  return locations[random]
}

export function configurePlayerValueObject(money, defaults) {
  if (money !== null && isFinite(+money)) {
    money = assign({}, defaults, { value: +money })
  } else if (!isPlainObject(money)) {
    money = assign({}, defaults)
  }
  money.max = (money.max === '*' || !isFinite(+money.max)) ? Number.MAX_VALUE
    : +money.max
  money.min = (money.min === '*' || !isFinite(+money.min)) ? 0
    : +money.min
  money.min = Math.min(money.max, money.min)
  money.value = isFinite(+money.value)
    ? Math.max(money.min, Math.min(money.max, +money.value))
    : Math.max(0, money.min)
  return money
}

export function configurePlayerStorage(storage, defaults) {
  if (isPlainObject(storage)) {
    if (storage.min === '*' || +storage.min < 0) {
      storage.min = defaults.player.storage.min
    }
  } else if (isFinite(storage)) {
    storage = assign({}, defaults.player.storage, { value: storage })
  } else {
    storage = defaults.player.storage
  }
  storage = configurePlayerValueObject(storage, defaults.player.storage)
  storage.filled = isPlainObject(storage.filled) ? storage.filled
    : (defaults.player.storage.filled || {})
  defaults.items.forEach((item) => {
    storage.filled[item.name] = storage.filled[item.name] || 0
  })
  // Remove keys belonging to items that do not exist.
  const items = defaults.items.map(item => item.name)
  const keys = Object.keys(storage.filled)
  for (let i = keys.length - 1; i >= 0; i--) {
    if (items.indexOf(keys[i]) === -1) {
      delete storage.filled[keys[i]]
    }
  }
  return storage
}

export function configurePlayer(state) {
  const p = state.player = isPlainObject(state.player) ? state.player : {}
  p.loans = configurePlayerLoans(p.loans)
  p.location = configurePlayerLocation(p.location, state.locations)
  p.cash = configurePlayerValueObject(p.cash, DEFAULTS.player.cash)
  p.bank = configurePlayerValueObject(p.bank, DEFAULTS.player.bank)
  p.health = configurePlayerValueObject(p.health, DEFAULTS.player.health)
  p.storage = configurePlayerStorage(p.storage, DEFAULTS)
  return p
}

export function configureRandomEvent(event, defaults, time = 30, times = []) {
  if (!isPlainObject(event)) {
    event = defaults
  }
  if (event.enabled === false) {
    return { enabled: false }
  }
  event.odds = isFinite(+event.odds) ? event.odds : defaults.odds
  event.odds = Math.max(0, Math.min(1, event.odds))
  event.times = []
  const empty = []
  for (let i = 0; i < time; i++) {
    if (!times[i]) {
      empty.push(i)
    }
  }
  let n = Math.min(empty.length, Math.floor(time * event.odds))
  while (empty.length && n > 0) {
    const r = Math.floor(Math.random() * empty.length)
    empty.splice(r, 1)
    event.times.push(r)
    --n
  }
  return event
}

export function configureRandomStorage(storage, defaults, time, events) {
  storage = configureRandomEvent(storage, defaults, time, events)
  storage.data = assign({}, defaults.data, storage.data)
  return storage
}

export function configureRandomEvents(state) {
  state.random = isPlainObject(state.random) || DEFAULTS.random
  const events = range(DEFAULTS.player.time).map(x => null)
  if (isPlainObject(state.random.storage)) {
    state.random.storage = configureRandomStorage(state.random.storage,
      DEFAULTS.random.storage, DEFAULTS.player.time, events)
    state.random.storage.times.forEach(n => (events[n] = 'storage'))
  }
  return events
}
