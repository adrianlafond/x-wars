import Place from './place'

/**
 * Game is a decision-making engine that takes input and produces output.
 */
export default class Game {
  constructor(config, history) {
    this.config = config
    this.history = history
  }

  randomPlace() {
    const locations = this.config.get('locations')
    const index = Math.floor(Math.random() * locations.length)
    return locations[index]
  }

  start() {
    const place = new Place(this.randomPlace())
    return place.output()
  }
}
