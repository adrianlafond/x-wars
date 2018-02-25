import Immutable from 'seamless-immutable'
import find from 'lodash.find'
import isFinite from 'lodash.isfinite'

export function pay({ current, commands, value }) {
  const command = find(commands, { name: 'pay' })
  if (command) {
    if (isFinite(+value)) {
      const amount = Math.max(0, Math.min(command.max, +value))
      const { money, loan } = current.player
      const player = {
        money: { value: money.value - amount },
        loan: {
          amount: loan.amount - amount,
          principal: Math.min(loan.principal, loan.amount - amount),
        },
      }
      return Immutable.merge(current, { player }, { deep: true })
    }
  }
  return current
}

export function borrow({ current, commands, value, interest }) {
  const command = find(commands, { name: 'borrow' })
  if (command) {
    if (isFinite(+value)) {
      const amount = Math.max(0, +value)
      const { money, loan } = current.player
      const player = {
        money: { value: money.value + amount },
        loan: {
          principal: loan.principal + amount,
          amount: loan.amount + amount,
          interest: isFinite(interest) ? interest : loan.interest,
        },
      }
      return Immutable.merge(current, { player }, { deep: true })
    }
  }
  return current
}
