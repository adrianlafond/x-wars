import Immutable from 'seamless-immutable'

export default function buy({ current, commands, item, quantity }) {
  const itemObj = current.items.filter(i => i.name === item)[0]
  const buyCmd = commands.filter(c => c.name === 'buy')
    .filter(c => c.value === item)[0]
  if (buyCmd) {
    quantity = Math.floor(Math.max(0, Math.min(buyCmd.max, quantity)))
    const price = itemObj.price * quantity
    const player = {
      cash: {
        value: current.player.cash.value - price,
      },
      storage: {
        value: current.player.storage.value,
        filled: {
          [item]: current.player.storage.filled[item] + quantity,
        }
      }
    }
    return Immutable.merge(current, { player }, { deep: true })
  }
  return current
}