import Immutable from 'seamless-immutable'
import { initializeHistory } from './configuration'

/*******************************************************************************
 * Holds an array of states of the game, enabling access to current states,
 * undo, and redo.
 ******************************************************************************/
export default class State {
  constructor() {
    this.states = null
    this.index = 0
  }

  update(state) {
    this.states = this.states ? this.states.slice(0, this.index + 1) : []
    const current = Immutable.merge(state, {
      history: {
        undo: true,
        redo: this.index < this.states.length - 1,
      },
    })
    this.states.push(current)
    this.index = this.states.length - 1
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
    if (state || !this.states) {
      this.states = [Immutable(state)]
    } else {
      this.states = this.states.slice(0, 1)
    }
    this.index = 0
    Immutable.merge(this.states, [initializeHistory()])
    return this
  }

  get current() {
    return this.getStateAtIndex()
  }

  getStateAtIndex(index = this.index) {
    if (this.states && this.states[index]) {
      return Immutable.merge(this.states[index], {
        history: {
          undo: index > 0,
          redo: index < this.states.length - 1,
        },
      })
    }
    return null
  }
}
