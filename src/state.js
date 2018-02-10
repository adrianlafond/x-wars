import Immutable from 'seamless-immutable'

const DATA = new WeakMap()

export default class State {
  constructor(initialState) {
    DATA.set(this, {
      states: initialState ? [Immutable(initialState)] : [],
      index: 0,
    })
  }

  updateIndex(index) {
    const data = DATA.get(this)
    return Math.max(0, Math.min(data.states.length - 1, index))
  }

  update(state) {
    const data = DATA.get(this)
    data.states.push(state)
    data.index = this.updateIndex(data.index + 1)
    return state
  }

  undo() {
    const data = DATA.get(this)
    if (data.index > 0) {
      data.index -= 1
      return this.current
    }
    return null
  }

  redo() {
    const data = DATA.get(this)
    if (data.index < data.states.length - 1) {
      data.index += 1
      return this.current
    }
    return null
  }

  reset() {
    const data = DATA.get(this)
    data.states = data.states[0] ? [data.states[0]] : []
    data.index = 0
    return this.current
  }

  get current() {
    const data = DATA.get(this)
    return data.states[data.index]
  }

  get canUndo() {
    const data = DATA.get(this)
    return data.index > 0
  }

  get canRedo() {
    const data = DATA.get(this)
    return data.index < data.states.length - 1
  }
}
