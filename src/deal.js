import Immutable from 'seamless-immutable'
import assign from 'lodash.assign'

export function getItem(name, items) {
  const c = items.filter(item => item.name === name)
  return c.length ? c[0] : null
}

export function getCommand(allCmds, command, item) {
  const c = allCmds.filter(c => c.name === command && c.value === item)
  return c.length ? c[0] : null
}

export function deal({ current, commands, item, quantity, command }) {
  const itemObj = getItem(item, current.items)
  const cmdObj = getCommand(commands, command, item)
  if (cmdObj) {
    quantity = Math.floor(Math.max(0, Math.min(cmdObj.max, quantity)))
    const price = itemObj.price * quantity
    const player = {
      cash: {
        value: current.player.cash.value + (command === 'buy' ? -price : price),
      },
      storage: {
        filled: {
          [item]: current.player.storage.filled[item]
            + (command === 'buy' ? quantity : -quantity)
        },
      },
    }
    return Immutable.merge(current, { player }, { deep: true })
  }
  return current
}

export function buy(params) {
  return deal(assign(params, { command: 'buy' }))
}

export function sell({ current, commands, item, quantity }) {
  return deal(assign(params, { command: 'sell' }))
}

export default { buy, sell }