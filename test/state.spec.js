import DEFAULTS from '../src/defaults'
import State from '../src/state'

describe('State', () => {
  //
  const state = new State(DEFAULTS)

  it('should create immutable state', () => {
    expect(state.current).not.toBeNull()
    expect(state.current).not.toBeUndefined()
    expect(typeof state.current).toBe('object')
    expect(() => { state.current.foo = 'bar' }).toThrow()
  })

  it('should update the state', () => {
    expect(state.current.foo).not.toEqual('bar')
    DEFAULTS.foo = 'bar'
    state.update(DEFAULTS)
    expect(state.current.foo).toEqual('bar')
  })

  it('should give correct undo and redo states #1', () => {
    expect(state.canUndo).toBe(true)
    expect(state.canRedo).toBe(false)
  })

  it('should undo to previous state', () => {
    const stateNow = state.current
    const statePrev = state.undo()
    expect(statePrev).not.toBe(stateNow)
    expect(statePrev).not.toEqual(stateNow)
  })

  it('should give correct undo and redo states #2', () => {
    expect(state.canUndo).toBe(false)
    expect(state.canRedo).toBe(true)
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
})
