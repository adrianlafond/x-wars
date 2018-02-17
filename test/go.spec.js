import {
  getTime,
  getLocation,
  getLoans,
} from '../src/go'

describe('go', () => {
  test('getTime() subtract 1 unit (or day, typically)', () => {
    expect(getTime(30)).toBe(29)
    expect(getTime(29.5)).toBe(28)
    expect(getTime(-0.5)).toBe(0)
    expect(getTime(0)).toBe(0)
    expect(getTime(-10)).toBe(0)
    expect(getTime('30')).toBe(29)
    expect(getTime({})).toBe(0)
    expect(getTime(true)).toBe(0)
    expect(getTime(false)).toBe(0)
    expect(getTime(null)).toBe(0)
    expect(getTime(undefined)).toBe(0)
  })

  test('getLocation() returns a valid or else current location', () => {
    const locations = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
    ]
    const current = { name: 'A', value: 0 }
    expect(getLocation(locations, 0).name).toBe('A')
    expect(getLocation(locations, 0).value).toBe(0)
    expect(getLocation(locations, 1).name).toBe('B')
    expect(getLocation(locations, 1).value).toBe(1)
    expect(getLocation(locations, 2).name).toBe('C')
    expect(getLocation(locations, 2).value).toBe(2)
    expect(getLocation(locations, -1, current).name).toBe('A')
    expect(getLocation(locations, -1, current).value).toBe(0)
    expect(getLocation(locations, 10, current).name).toBe('A')
    expect(getLocation(locations, 10, current).value).toBe(0)
  })

  test('getLoans() compounds interest to amount of each loan', () => {
    const loans = [
      { principal: 1000, interest: 0.1 },
      { principal: 2000, interest: 0.2 },
    ]

    const loans2 = getLoans(loans)
    // Only update amount; principal and interest stay untouched.
    expect(loans2[0].principal).toEqual(1000)
    expect(loans2[0].interest).toEqual(0.1)
    expect(loans2[0].amount).toEqual(1100)
    expect(loans2[1].amount).toEqual(2400)

    // Compound the amount.
    const loans3 = getLoans(loans2)
    expect(loans3[0].amount).toEqual(1100 + 1100 * 0.1)
    expect(loans3[1].amount).toEqual(2400 + 2400 * 0.2)
  })
})
