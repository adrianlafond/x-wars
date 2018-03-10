import DEFAULTS from '../defaults.json'

export default class Locations {
  constructor(config) {
    this.config = config || {}
  }

  get data() {
    const array = (Array.isArray(this.config.locations)
      && this.config.locations.length)
      ? this.config.locations
      : DEFAULTS.locations
    const set = new Set(array)
    while (set.size < 2) {
      set.add(DEFAULTS.locations[set.size])
    }
    return [...set]
  }
}
