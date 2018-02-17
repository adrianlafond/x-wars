import Immutable from 'seamless-immutable'

export function getTime(time) {
  if (isNaN(time) || time <= 0) {
    return 0
  }
  return Math.max(0, Math.floor(time) - 1)
}

export function getLocation(locations, index, currentLocation) {
  if (locations[index]) {
    return {
      name: locations[index].name,
      value: index,
    }
  }
  return currentLocation
}

export function getLoans(loans) {
  return loans.map(loan => {
    const amount = loan.hasOwnProperty('amount') ? loan.amount :  loan.principal
    return {
      principal: loan.principal,
      interest: loan.interest,
      amount: amount + amount * loan.interest
    }
  })
}

export function getPlayer(state, locationIndex) {
  return {
    time: getTime(state.player.time),
    location: getLocation(state.locations, locationIndex, state.player.location),
    loans: getLoans(state.player.loans),
  }
}

export default function go(state, locationIndex) {
  const player = getPlayer(state, locationIndex)
  return Immutable.merge(state, { player }, { deep: true })
}