import History from '../src/history'

describe('history', () => {

  const history = new History()
  const item = { location: 5 }

  it('should instantiate with empty data', () => {
    expect(history.length).toBe(0)
  })

  it('should add a place and update length', () => {
    expect(history.add({ location: 1 })).toBe(1)
    expect(history.add({ location: 2 })).toBe(2)
    expect(history.add({ location: 3 })).toBe(3)
    expect(history.add({ location: 4 })).toBe(4)
    expect(history.add(item)).toBe(5)
  })

  it('should return correct length', () => {
    expect(history.length).toBe(5)
  })

  it('should go back', () => {
    expect(history.back().location).toBe(4)
  })

  it('should go forward', () => {
    expect(history.forward().location).toBe(5)
  })

  it('should return null is moved forward too far', () => {
    expect(history.forward()).toBe(null)
  })

  it('should return correct current item', () => {
    expect(history.current).toBe(item)
  })

  it('should remove specific item', () => {
    expect(history.remove(item)).toBe(4)
  })

  it('should remove specific index', () => {
    expect(history.remove(0)).toBe(3)
  })

  it('should reset back to empty data', () => {
    expect(history.reset()).toBe(0)
  })

  it('should return null for current after reset', () => {
    expect(history.current).toBe(null)
  })
})