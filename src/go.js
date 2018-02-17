import Immutable from 'seamless-immutable'

function getTime(time) {
  if (isNaN(time) || time <= 0) {
    return time
  }
  return Math.max(0, Math.floor(time) - 1)
}

function getLocation(locations, index) {
  return {
    name: locations[index].name,
    value: index,
  }
}

function getLoans(loans) {
  return loans.map(loan => {
    const amount = loan.hasOwnProperty('amount') ? loan.amount :  loan.principal
    return {
      principal: loan.principal,
      interest: loan.interest,
      amount: amount + amount * loan.interest
    }
  })
}

function getPlayer(state, locationIndex) {
  return {
    time: getTime(state.player.time),
    location: getLocation(state.locations, locationIndex),
    loans: getLoans(state.player.loans),
  }
}

export default function go(state, locationIndex) {
  const player = getPlayer(state, locationIndex)
  return Immutable.merge(state, { player }, { deep: true })
}