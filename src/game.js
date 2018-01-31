import Place from './place'

/**
 * Game is a decision-making engine that takes input and produces output.
 */
export default class Game {
  constructor(config, history, player) {
    this.config = config
    this.history = history
    this.player = player
  }

  start() {
    this.history.reset()
    this.history.push(new Place(this.config, this.player))
    return this.history.current.output()
  }
}
