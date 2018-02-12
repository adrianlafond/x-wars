import DEFAULTS from '../src/defaults'
import State from '../src/state'

describe('State', () => {
  //
  DEFAULTS.foo = 'zap'
  const state = new State(DEFAULTS)

  it('should create immutable state', () => {
    expect(state.current).not.toBeNull()
    expect(state.current).not.toBeUndefined()
    expect(typeof state.current).toBe('object')
    expect(() => { state.current.foo = 'bar' }).toThrow()
  })

  it('should give correct undo and redo states #1', () => {
    // expect(state.current.status.undos).toBe(0)
    // expect(state.current.status.redos).toBe(0)
  })

  it('should update the state', () => {
    expect(state.current.foo).toEqual('zap')
    DEFAULTS.foo = 'bar'
    expect(state.update(DEFAULTS)).toEqual(state)
    expect(state.current.foo).toEqual('bar')
  })

  it('should give correct undo and redo states #2', () => {
    // expect(state.current.status.undos).toBe(1)
    // expect(state.current.status.redos).toBe(0)
  })

  it('should undo to previous state', () => {
    const stateNow = state.current
    const statePrev = state.undo()
    expect(statePrev).not.toBe(stateNow)
    expect(statePrev).not.toEqual(stateNow)
  })

  it('should give correct undo and redo states #3', () => {
    // expect(state.current.status.undos).toBe(0)
    // expect(state.current.status.redos).toBe(1)
  })

  it('should return null if cannot undo', () => {
    expect(state.undo()).toBe(null)
  })

  it('should redo an undo', () => {
    const stateNow = state.current
    const stateNext = state.redo()
    expect(stateNext).not.toBe(stateNow)
    expect(stateNext).not.toEqual(stateNow)
    expect(stateNext).toBe(state.current)
    expect(stateNext.foo).toBe('bar')
  })

  it('should return null if cannot redo', () => {
    expect(state.redo()).toBe(null)
  })

  it('should reset to initial state', () => {
    expect(state.current.foo).toBe('bar')
    expect(state.reset().foo).toBe('zap')
    expect(state.current.foo).toBe('zap')
    // expect(state.current.status.undos).toBe(0)
    // expect(state.current.status.redos).toBe(0)
    expect(state.redo()).toBe(null)
  })
})
