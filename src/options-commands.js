import assign from 'lodash.assign'

export default class OptionsCommands {
  constructor(state) {
    this.state = state
    this.commands = this.getCommands()
  }

  getCommands() {
    const { player } = this.state
    const isLive = player.time > 0
    const canRelocate = player.time > 1
    const base = this.getBaseCommands()
    const locations = canRelocate ? this.getLocationCommands() : []
    const items = isLive ? this.getItemCommands() : []
    const loan = isLive ? this.getLoanCommands() : []
    const finish = isLive && !canRelocate ? [{ name: 'finish' }] : []
    return base.concat(locations, items, loan, finish)
  }

  getBaseCommands() {
    const { history } = this.state
    const commands = [{ name: 'reset' }]
    if (history.undo) {
      commands.push({ name: 'undo' })
    }
    if (history.redo) {
      commands.push({ name: 'redo' })
    }
    return commands
  }

  getLocationCommands() {
    return this.state.locations.map((location) => ({
      name: 'go',
      value: location,
    }))
  }

  getItemCommands() {
    const filled = this.getStorageFilled()
    return this.state.items.reduce((commands, item) => {
      const cmd = this.getSingleItemCommand(item)
      const buy = { name: 'buy', max: this.getItemMaxBuy(item, filled) }
      const sell = { name: 'sell', max: this.getItemMaxSell(item) }
      commands.push(assign({}, cmd, buy))
      commands.push(assign({}, cmd, sell))
      return commands
    }, [])
  }

  getSingleItemCommand(item) {
    return { value: item.name, price: item.price }
  }

  getItemMaxBuy(item, filled) {
    const { player } = this.state
    const avail = player.storage.value - filled
    return Math.min(avail, Math.floor(player.money / item.price))
  }

  getStorageFilled() {
    const storage = this.state.player.storage
    return Object.keys(storage.filled).reduce((sum, item) => {
      return sum + storage.filled[item]
    }, 0)
  }

  getItemMaxSell(item) {
    return this.state.player.storage.filled[item.name]
  }

  getLoanCommands() {
    const { loan, money } = this.state.player
    const commands = [
      {
        name: 'pay',
        max: Math.min(loan.amount, money),
      },
      { name: 'borrow' },
    ]
    return commands
  }
}
