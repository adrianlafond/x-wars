import Immutable from 'seamless-immutable'
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
    return this.commands
      .filter(c => c.name === 'go')
      .some(c => c.value === location)
  }

  updatePlayer(location) {
    return {
      location,
      time: this.state.current.player.time - 1,
      loans: this.updateLoans(),
    }
  }

  updateLoans() {
    const { loans } = this.state.current.player
    return loans.map(loan => {
      return {
        principal: loan.principal,
        interest: loan.interest,
        amount: loan.amount + loan.amount * loan.interest,
      }
    })
  }
}
