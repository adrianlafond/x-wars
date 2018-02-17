import State from './state'
import go from './go'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const STATE = new WeakMap()
const ACTIONS = new WeakMap()

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    STATE.set(this, new State(config))
    ACTIONS.set(this, ['reset'])
  }

  action(...action) {
    const state = STATE.get(this)
    const actions = ACTIONS.get(this)
    if (actions.indexOf(actions[0]) !== -1) {
      let current = state.current
      switch (action[0]) {
        case 'go':
          state.update(go(current, action[1]))
          break
        case 'undo':
          state.undo()
          break
        case 'redo':
          state.redo()
          break
        case 'reset':
          STATE.set(this, new State(action[1]))
          break
        default:
          break
      }
    }
    return this.options
  }

  // Returns current options available to user (same as this.action()).
  get options() {
    const state = STATE.get(this).current.asMutable({ deep: true })
    const options = {
      player: state.player,
      live: state.player.time > 0,
      commands: state.player.time > 0 ? state.locations.map((data, index) => ({
        name: 'go',
        value: index,
        data,
      })) : [],
    }
    options.commands.push({ name: 'reset' })
    if (STATE.get(this).index > 0) {
      options.commands.push({ name: 'undo' })
    }
    if (STATE.get(this).index < STATE.get(this).states.length - 1) {
      options.commands.push({ name: 'redo' })
    }
    ACTIONS.set(this, options.commands.map(c => c.name))
    return options
  }
}
