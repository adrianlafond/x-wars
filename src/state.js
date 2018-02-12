import Immutable from 'seamless-immutable'
import configure from './configure'

function mergeState(state, index, statesLength) {
  return Immutable.merge(state, {
    status: {
      // Not `index - 1` because final undo ends on the initial state,
      // not on a null or empty state.
      undos: Math.max(0, index),
      redos: Math.max(0, statesLength - 1 - index),
    }
  })
}

export default class State {
  constructor(initialState) {
    this.reset(initialState)
  }

  update(state) {
    this.states.push(mergeState(state, this.index + 1, this.states.length))
    this.index = Math.max(0, Math.min(this.states.length - 1, this.index + 1))
    return this
  }

  undo() {
    if (this.index > 0) {
      this.index -= 1
      this.states[this.index] = mergeState(this.current, this.index,
        this.states.length)
      return this.current
    }
    return null
  }

  redo() {
    if (this.index < this.states.length - 1) {
      this.index += 1
      this.states[this.index] = mergeState(this.current, this.index,
        this.states.length)
      return this.current
    }
    return null
  }

  reset(state = null) {
    if (state || !this.states) {
      this.states = [configure(state)]
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
