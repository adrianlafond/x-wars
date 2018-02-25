import Immutable from 'seamless-immutable'
import find from 'lodash.find'
import { calculateItemPrices } from './configure'

/*******************************************************************************
 * Advance place, time, loans, random events. Also finishes the game.
 ******************************************************************************/
export default class Advance {
  constructor(state) {
    this.state = state
    this.commands = null
  }

  go(location) {
    const player = this.isLocationOk(location) ? this.updatePlayer(location) : {}
    const items = calculateItemPrices(this.state.current.items)
    return Immutable.merge(this.state.current, { player, items },
      { deep: true })
  }

  finish() {
    const player = this.updatePlayer(this.state.current.player.location)
    return Immutable.merge(this.state.current, { player }, { deep: true })
  }

  isLocationOk(location) {
    return !!find(this.commands, { name: 'go', value: location })
  }

  updatePlayer(location) {
    return {
      location,
      time: this.state.current.player.time - 1,
      loan: this.updateLoan(),
    }
  }

  updateLoan() {
    const loan = this.state.current.player.loan.asMutable()
    loan.amount += loan.amount * loan.interest
    return loan
  }
}
