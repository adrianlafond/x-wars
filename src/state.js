import Immutable from 'seamless-immutable'

export default class State {
  constructor(initialState) {
    this.reset(initialState)
  }

  updateIndex(index) {
    return Math.max(0, Math.min(this.states.length - 1, index))
  }

  update(state) {
    this.states.push(state)
    this.index = this.updateIndex(this.index + 1)
    return this
  }

  undo() {
    if (this.index > 0) {
      this.index -= 1
      return this.current
    }
    return null
  }

  redo() {
    if (this.index < this.states.length - 1) {
      this.index += 1
      return this.current
    }
    return null
  }

  reset(state = null) {
    const initialState = state || this.states[0] || null
    this.states = initialState ? [Immutable(initialState)] : []
    this.index = 0
    return this.current
  }

  get current() {
    return this.states[this.index]
  }

  get canUndo() {
    return this.index > 0
  }

  get canRedo() {
    return this.index < this.states.length - 1
  }
}
