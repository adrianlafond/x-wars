import State from './state'
import go from './go'
import options from './options'

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
    const result = options(STATE.get(this))
    ACTIONS.set(this, result.commands.map(command => command.name))
    return result
  }
}
