import isFinite from 'lodash.isfinite'

/**
 * History is a model of all states of the game, current and past.
 */
export default class History {
  constructor() {
    this.reset()
  }

  reset() {
    this.index = -1
    this.data = []
    return this.length
  }

  add(place, index) {
    this.data.push(place)
    this.index = this.data.length - 1
    return this.length
  }

  remove(placeOrIndex) {
    if (typeof placeOrIndex === 'number' && this.data[placeOrIndex]) {
      // Remove by index.
      this.data.splice(placeOrIndex, 1)
    } else {
      // Remove by specific item.
      const index = this.data.indexOf(placeOrIndex)
      if (index !== -1) {
        this.data.splice(index, 1)
      }
    }
    return this.length
  }

  go(relative) {
    this.index = this.constrainedIndex(this.index + relative)
    return this.current
  }

  goto(index) {
    this.index = this.constrainedIndex(index)
    return this.current
  }

  back() {
    return (this.index > 0) ? this.go(-1) : null
  }

  forward() {
    return (this.index < this.length - 1) ? this.go(1) : null
  }

  constrainedIndex(index) {
    return Math.min(this.length - 1,
      Math.max(0, isFinite(index) ? Math.floor(index) : this.index))
  }

  get length() {
    return this.data.length
  }

  get current() {
    return this.index === -1 ? null : this.data[this.index]
  }
}
