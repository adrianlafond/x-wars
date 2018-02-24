import Advance from '../src/advance'

describe('go', () => {
  test('isLocationOk() ensures chosen location is valid', () => {
    const a = new Advance()
    a.commands = [
      { name: 'buy' },
      { name: 'reset' },
      { name: 'go', value: 'A' },
      { name: 'go', value: 'B' },
      { name: 'go', value: 'C' },
    ]
    expect(a.isLocationOk('A')).toBe(true)
    expect(a.isLocationOk('E')).toBe(false)
    a.commands = a.commands.slice(0, 2)
    expect(a.isLocationOk('A')).toBe(false)
  })

  // test('updateLoans() compounds interest to amount of each loan', () => {
  //   const loans = [
  //     { principal: 1000, interest: 0.1 },
  //     { principal: 2000, interest: 0.2 },
  //   ]
  //   loans.forEach((loan) => (loan.amount = loan.principal))

  //   const loans2 = updateLoans(loans)
  //   // Only update amount; principal and interest stay untouched.
  //   expect(loans2[0].principal).toEqual(1000)
  //   expect(loans2[0].interest).toEqual(0.1)
  //   expect(loans2[0].amount).toEqual(1100)
  //   expect(loans2[1].amount).toEqual(2400)

  //   // Compound the amount.
  //   const loans3 = updateLoans(loans2)
  //   expect(loans3[0].amount).toEqual(1100 + 1100 * 0.1)
  //   expect(loans3[1].amount).toEqual(2400 + 2400 * 0.2)
  // })
})
