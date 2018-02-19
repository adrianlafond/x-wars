import Immutable from 'seamless-immutable'
import configure from './configure'

export default class State {
  constructor(initialState) {
    this.reset(initialState)
  }

  update(state) {
    this.states.push(Immutable(state))
    this.index = Math.max(0, Math.min(this.states.length - 1, this.index + 1))
    return this
  }

  undo() {
    if (this.index > 0) {
      this.index -= 1
      this.states[this.index] = this.current
      return this.current
    }
    return null
  }

  redo() {
    if (this.index < this.states.length - 1) {
      this.index += 1
      this.states[this.index] = this.current
      return this.current
    }
    return null
  }

  reset(state = null) {
    if (state || !this.states) {
      this.states = [Immutable(configure(state))]
    } else {
      this.states = this.states.slice(0, 1)
    }
    this.index = 0
    return this.current
  }

  get current() {
    return this.states[this.index]
  }
}
