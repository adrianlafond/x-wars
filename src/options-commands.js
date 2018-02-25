import assign from 'lodash.assign'

export default class OptionsCommands {
  constructor(state) {
    this.state = state
    this.commands = this.getCommands()
  }

  getCommands() {
    const isLive = this.state.current.player.time > 0
    const canRelocate = this.state.current.player.time > 1
    const base = this.getBaseCommands()
    const locations = canRelocate ? this.getLocationCommands() : []
    const items = isLive ? this.getItemCommands() : []
    const loan = isLive ? this.getLoanCommands() : []
    const finish = isLive && !canRelocate ? [{ name: 'finish' }] : []
    return base.concat(locations, items, loan, finish)
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
      Math.floor(this.state.current.player.money.value / item.price))
  }

  getItemMaxSell(item) {
    return this.state.current.player.storage.filled[item.name]
  }

  getLoanCommands() {
    const { loan, money } = this.state.current.player
    const commands = [
      {
        name: 'pay',
        max: Math.min(loan.amount, money.value),
      },
      { name: 'borrow' },
    ]
    return commands
  }
}
