import cloneDeep from 'lodash.clonedeep'
import State from './state'
import go from './go'
import buy from './buy'
import getOptions from './options'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const STATE = new WeakMap()
const OPTIONS = new WeakMap()

function actionExists(possible, action) {
  return possible.some((cmd) => cmd.name === action)
}

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    STATE.set(this, new State(config))
    this.updateOptions()
  }

  action(...action) {
    const state = STATE.get(this)
    const { commands } = OPTIONS.get(this)
    if (actionExists(commands, action[0])) {
      const { current } = state
      const params = { current, commands }
      switch (action[0]) {
        case 'go':
          params.location = action[1]
          state.update(go(params))
          break
        case 'buy':
          params.item = action[1]
          params.quantity = action[2]
          state.update(buy(params))
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
    this.updateOptions()
    return this.options
  }

  // Returns current options available to user (same as this.action()).
  get options() {
    return cloneDeep(OPTIONS.get(this))
  }

  updateOptions() {
    const options = getOptions(STATE.get(this))
    OPTIONS.set(this, options)
    return options
  }
}
