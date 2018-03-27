import Immutable from 'seamless-immutable'
import find from 'lodash.find'
import { getItemPrice } from './configuration/items'

/*******************************************************************************
 * Advance place, time, loans, random events. Also finishes the game.
 ******************************************************************************/
export default class Advance {
  constructor(config, state) {
    this.config = config
    this.state = state
    this.commands = null
  }

  start() {
    const { locations } = this.config
    const index = Math.floor(Math.random() * locations.length)
    return this.go(locations[index], false)
  }

  go(location, advance = true) {
    const player = this.isLocationOk(location)
      ? this.updatePlayer(location, advance) : {}
    const items = this.current.items.map(item => {
      return Immutable.merge(item, { price: getItemPrice(item) })
    })
    return Immutable.merge(this.current, { player, items },
      { deep: true })
  }

  finish() {
    const player = this.updatePlayer(this.current.player.location)
    return Immutable.merge(this.current, { player }, { deep: true })
  }

  isLocationOk(location) {
    return !!find(this.commands, { name: 'go', value: location })
  }

  updatePlayer(location, advance = true) {
    return {
      location,
      time: this.current.player.time - (advance ? 1 : 0),
      loan: this.updateLoan(advance),
    }
  }

  updateLoan(advance = true) {
    const loan = this.current.player.loan.asMutable()
    if (advance) {
      loan.amount += loan.amount * loan.interest
    }
    return loan
  }

  get current() {
    return this.state.current || this.config
  }
}
