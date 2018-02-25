import OptionsInfo from './options-info'
import OptionsCommands from './options-commands'

/*******************************************************************************
 * Creates `options` available to the user to play.
 ******************************************************************************/
export default class Options {
  constructor(state) {
    this.state = state
    this.options = this.getOptions()
  }

  getOptions() {
    const info = new OptionsInfo(this.state).info
    const commands = new OptionsCommands(this.state).commands
    return { info, commands }
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
