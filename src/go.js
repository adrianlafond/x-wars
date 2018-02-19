import Immutable from 'seamless-immutable'
import { calculateItemPrices } from './configure'

export function updateLoans(loans) {
  return loans.map(loan => {
    return {
      principal: loan.principal,
      interest: loan.interest,
      amount: loan.amount + loan.amount * loan.interest,
    }
  })
}

export function locationOk(commands, location) {
  return commands
    .filter(c => c.name === 'go')
    .some(c => c.value === location)
}

export function updatePlayer(state, commands, location) {
  return locationOk(commands, location) && {
    time: state.player.time - 1,
    location,
    loans: updateLoans(state.player.loans),
  }
}

export default function go({ current, commands, location }) {
  const player = updatePlayer(current, commands, location) || {}
  const items = calculateItemPrices(current.items)
  return Immutable.merge(current, { player, items }, { deep: true })
}
