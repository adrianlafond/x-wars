import cloneDeep from 'lodash.clonedeep'
import State from './state'
import deal from './deal'
import Advance from './advance'
import Options from './options'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const STATE = new WeakMap()
const OPTIONS = new WeakMap()
const ADVANCE = new WeakMap()

function actionExists(possible, action) {
  return possible.some((cmd) => cmd.name === action)
}

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    STATE.set(this, new State(config))
    ADVANCE.set(this, new Advance(STATE.get(this)))
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
          state.update(ADVANCE.get(this).go(action[1]))
          break
        case 'finish':
          state.update(ADVANCE.get(this).finish())
          break
        case 'buy':
        case 'sell':
          params.item = action[1]
          params.quantity = action[2]
          state.update(deal[action[0]](params))
          break
        case 'undo':
          state.undo()
          break
        case 'redo':
          state.redo()
          break
        case 'reset':
          STATE.get(this).reset(action[1])
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
    const options = new Options(STATE.get(this)).options
    OPTIONS.set(this, options)
    ADVANCE.get(this).commands = options.commands
    return options
  }
}
