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
    STATE.set(this, new State(DEFAULTS, config, { deep: true }))
    return this
  }

  play(...action) {
    return this.state
  }

  undo() {
    //
  }

  redo() {
    //
  }

  get state() {
    return STATE.get(this).current.asMutable({ deep: true })
  }
}
