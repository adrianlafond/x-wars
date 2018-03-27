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
