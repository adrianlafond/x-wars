
/**
 * History is a model of all states of the game, current and past.
 */
export default class History {
  constructor() {
    this.reset()
  }

  reset() {
    this.data = []
  }

  push(place) {
    this.data.push(place)
  }

  get current() {
    const len = this.data.length
    return len ? this.data[len - 1] : null
  }
}
