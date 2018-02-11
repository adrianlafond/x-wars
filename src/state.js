import Immutable from 'seamless-immutable'

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
    const initialState = state || this.states[0] || null
    const immutableState = initialState ? Immutable(initialState).merge({
      status: {
        undos: 0,
        redos: 0,
      }
    }) : null
    this.states = initialState ? [immutableState] : []
    this.index = 0
    return this.current
  }

  get current() {
    return this.states[this.index]
  }
}
