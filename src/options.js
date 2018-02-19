function getInfo(current) {
  const player = current.player
  return {
    time: player.time,
    live: player.time > 0,
    location: player.location,
    loans: player.loans.asMutable({ deep: true }),
    cash: player.cash.value,
    bank: player.bank.value,
    health: player.health.value,
    storage: {
      value: player.storage.value,
      filled: player.storage.filled.asMutable({ deep: true }),
    },
  }
}

export function getRandomStorageCommand(player, event) {
  const units = Math.min(player.storage.max,
    player.storage.value * event.multiply)
  return {
    name: 'buy',
    value: 'storage',
    price: units * event.cost,
    units,
  }
}

export function getRandomEventCommand(time, events, random, player) {
  const value = events[time]
  const event = value && random[value]
  if (event) {
    return getRandomStorageCommand(player, event.data)
  }
  return null
}

export default function options(state) {
  const current = state.current
  const options = {
    info: getInfo(current),
    commands: [],
  }
  if (options.info.live) {
    current.locations.forEach((location) => {
      options.commands.push({
        name: 'go',
        value: location,
      })
    })
    const avail = current.player.storage.max - current.player.storage.value
    current.items.forEach((item) => {
      const max = Math.min(avail,
        Math.floor(current.player.cash.value / item.price))
      options.commands.push({
        name: 'buy',
        value: item.name,
        price: item.price,
        max,
      })
    })
  }
  options.commands.push({ name: 'reset' })
  if (state.index > 0) {
    options.commands.push({ name: 'undo' })
  }
  if (state.index < state.states.length - 1) {
    options.commands.push({ name: 'redo' })
  }
  return options
}
