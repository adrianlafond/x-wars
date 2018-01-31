import cloneDeep from 'lodash.clonedeep'

/**
 *
 */
export default class Place {
  constructor(config, player, place = null, firstPlace = false) {
    this.config = config
    this.player = player
    this.place = place || this.randomPlace()
    this.items = this.createItems()
    this.event = firstPlace ? null : this.randomEvent()
  }

  output() {
    return cloneDeep({
      place: this.place,
      items: this.items,
      player: this.player.data,
    })
  }

  randomPlace() {
    const locations = this.config.get('locations')
    const index = Math.floor(Math.random() * locations.length)
    return locations[index]
  }

  randomEvent() {
    return null
    // return this.randomAdversary()
  }

  randomAdversary() {
    const array = this.config.get('adversaries')
    for (let i = 0; i < array.length; i++) {
      if (Math.random() <= array[i].odds) {
        //
      }
    }
    return null
  }

  createItems() {
    return this.config.get('items').map((item) => ({
      name: item.name,
      price: Math.floor(Math.random() * item.max - item.min + item.min),
    }))
  }
}
