import Immutable from 'seamless-immutable'
import State from './state';
import DEFAULTS from './defaults.json'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const STATE = new WeakMap()
const OPTIONS = new WeakMap()

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

  action(...action) {
    const state = STATE.get(this)
    let current = state.current
    switch (action[0]) {
      case 'go':
        current = Immutable.merge(current, {
          player: {
            time: current.player.time - 1,
            location: current.locations[action[1]].name,
          }
        }, { deep: true })
        state.update(current)
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
    const options = {
      player: state.player,
      commands: state.player.time > 0 ? state.locations.map((data, index) => ({
        name: 'go',
        value: index,
        data,
      })) : []
    }
    OPTIONS.set(this, options)
    return options
  }
}
