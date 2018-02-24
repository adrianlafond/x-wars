import assign from 'lodash.assign'

/*******************************************************************************
 * Creates `options` available to the user to play.
 ******************************************************************************/
export default class Options {
  constructor(state) {
    this.state = state
    this.options = this.getOptions()
  }

  isLive() {
    return this.state.current.player.time > 0
  }

  canRelocate() {
    return this.state.current.player.time > 1
  }

  getOptions() {
    return {
      info: this.getInfo(),
      commands: this.getCommands(),
    }
  }

  getInfo() {
    const player = this.state.current.player
    return {
      time: player.time,
      live: this.isLive(),
      location: player.location,
      loans: player.loans.asMutable({ deep: true }),
      cash: player.cash.value,
      bank: player.bank.value,
      health: player.health.value,
      storage: this.getInfoStorage(player),
      score: this.getScore(player),
    }
  }

  getInfoStorage(player) {
    return {
      value: player.storage.value,
      filled: player.storage.filled.asMutable({ deep: true }),
    }
  }

  // Score = $ * 2 / million, floored out of 100.
  // Example: $25,005,001 = 50,010,002 / 100,000,000 = 50/100.
  getScore(player) {
    const money = player.bank.value + player.cash.value
    const millions = money * 2 / 1000000
    return Math.min(100, Math.floor(millions))
  }

  getCommands() {
    const isLive = this.isLive()
    const canRelocate = this.canRelocate()
    const base = this.getBaseCommands()
    const locations = canRelocate ? this.getLocationCommands() : []
    const items = isLive ? this.getItemCommands() : []
    const finish = isLive && !canRelocate ? [{ name: 'finish' }] : []
    return base.concat(locations, items, finish)
  }

  getBaseCommands() {
    const commands = [{ name: 'reset' }]
    if (this.state.index > 0) {
      commands.push({ name: 'undo' })
    }
    if (this.state.index < this.state.states.length - 1) {
      commands.push({ name: 'redo' })
    }
    return commands
  }

  getLocationCommands() {
    return this.state.current.locations.map((location) => ({
      name: 'go',
      value: location,
    }))
  }

  getItemCommands() {
    return this.state.current.items.reduce((commands, item) => {
      const cmd = this.getSingleItemCommand(item)
      const buy = { name: 'buy', max: this.getItemMaxBuy(item) }
      const sell = { name: 'sell', max: this.getItemMaxSell(item) }
      commands.push(assign({}, cmd, buy))
      commands.push(assign({}, cmd, sell))
      return commands
    }, [])
  }

  getSingleItemCommand(item) {
    return { value: item.name, price: item.price }
  }

  getItemMaxBuy(item) {
    const player = this.state.current.player
    const avail = player.storage.max - player.storage.value
    return Math.min(avail,
      Math.floor(this.state.current.player.cash.value / item.price))
  }

  getItemMaxSell(item) {
    return this.state.current.player.storage.filled[item.name]
  }
}

// function getRandomStorageCommand(player, event) {
//   const units = Math.min(player.storage.max,
//     player.storage.value * event.multiply)
//   return {
//     name: 'buy',
//     value: 'storage',
//     price: units * event.cost,
//     units,
//   }
// }

// function getRandomEventCommand(time, events, random, player) {
//   const value = events[time]
//   const event = value && random[value]
//   if (event) {
//     return getRandomStorageCommand(player, event.data)
//   }
//   return null
// }
