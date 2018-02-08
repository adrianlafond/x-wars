import History from '../src/history'

describe('history', () => {
  const history = new History()
  const item = { location: 5 }

  it('should instantiate with empty data', () => {
    expect(history.length).toBe(0)
  })

  it('should have have null current item at start', () => {
    expect(history.current).toBe(null)
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

  it('should return constrained index', () => {
    expect(history.constrainedIndex()).toBe(4)
    expect(history.constrainedIndex(-1)).toBe(0)
    expect(history.constrainedIndex(5)).toBe(4)
    expect(history.constrainedIndex(2.5)).toBe(2)
    expect(history.constrainedIndex(null)).toBe(4)
    expect(history.constrainedIndex('3')).toBe(4)
    expect(history.constrainedIndex(undefined)).toBe(4)
    expect(history.constrainedIndex(0 / 0)).toBe(4)
  })

  it('should go to relative index', () => {
    expect(history.go(-1).location).toBe(4)
    expect(history.go(-5).location).toBe(1)
    expect(history.go(10).location).toBe(5)
  })

  it('should go to absolute index', () => {
    expect(history.goto(2).location).toBe(3)
    expect(history.goto(-1).location).toBe(1)
    expect(history.goto(10).location).toBe(5)
  })

  it('should go back', () => {
    expect(history.back().location).toBe(4)
  })

  it('should return null is moved back too far', () => {
    const index = history.index
    expect(history.goto(0).location).toBe(1)
    expect(history.back()).toBe(null)
    expect(history.goto(index))
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
