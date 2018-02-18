

export default function options(state) {
  const current = state.current
  const options = {
    player: current.player.asMutable({ deep: true }),
    live: current.player.time > 0,
    commands: [],
  }
  if (options.live) {
    current.locations.forEach((location, index) => {
      options.commands[index] = {
        name: 'go',
        value: index,
        data: location.asMutable({ deep: true }),
      }
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