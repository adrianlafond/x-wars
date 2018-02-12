import State from './state';
import DEFAULTS from './defaults.json'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const STATE = new WeakMap()

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    this.reset(config)
  }

  reset(config) {
    STATE.set(this, new State(config))
    return this
  }

  play(...action) {
    switch (action[0]) {
      case 'go':
        break
      default:
        break
    }
    return this.options
  }

  undo() {
    //
  }

  redo() {
    //
  }

  // Returns current options available to user (same as this.play()).
  get options() {
    const state = STATE.get(this).current.asMutable({ deep: true })
    return {
      player: state.player,
      go: state.locations.map((data, index) => ({
        value: index,
        data,
      }))
    }
  }
}
