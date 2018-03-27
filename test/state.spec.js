import DEFAULTS from '../src/defaults'
import State from '../src/state'
import Advance from '../src/advance'
import Configuration from '../src/configuration'

describe('State', () => {
  //
  let state

  beforeEach(() => {
    DEFAULTS.foo = 'zap'
    state = new State()
    const config = new Configuration(DEFAULTS).data
    const advance = new Advance(config, state)
    state.reset(advance.start())
  })

  function updated(value) {
    DEFAULTS.foo = value || 'bar'
    return new Configuration(DEFAULTS).data
  }

  it('should create immutable state', () => {
    expect(state.current).not.toBeNull()
    expect(state.current).not.toBeUndefined()
    expect(typeof state.current).toBe('object')
  })

  it('should throw an error if trying to set a property, because immutable', () => {
    expect(() => { state.current.foo = 'bar' }).toThrow()
  })

  it('should have an initial state without possible undo or redo', () => {
    expect(state.current.history.undo).toBe(false)
    expect(state.current.history.redo).toBe(false)
  })

  it('should return reference to itself on update', () => {
    expect(state.update(updated())).toEqual(state)
  })

  it('should update state immutably', () => {
    const a = state.current
    const b = state.update(updated()).current
    expect(a.foo).toEqual('zap')
    expect(b.foo).toEqual('bar')
    expect(a).not.toEqual(b)
  })

  it('should allow undo after update', () => {
    const a = state.current
    const b = state.update(updated()).current
    const c = state.update(updated('buzz')).current
    expect(a.history.undo).toBe(false)
    expect(b.history.undo).toBe(true)
    expect(c.history.undo).toBe(true)
  })

  it('should undo and redo to work with history updated', () => {
    const a = state.current
    expect(a.history.undo).toBe(false)
    expect(a.history.redo).toBe(false)
    const b = state.update(updated()).current
    expect(b.history.undo).toBe(true)
    expect(b.history.redo).toBe(false)
    const c = state.undo()
    expect(c.history.undo).toBe(false)
    expect(c.history.redo).toBe(true)
    expect(a.foo).not.toEqual(b.foo)
    expect(a.foo).toEqual(c.foo)
    const d = state.redo()
    expect(d.history.undo).toBe(true)
    expect(d.history.redo).toBe(false)
    expect(d.foo).not.toEqual(c.foo)
    expect(d.foo).toEqual(b.foo)
  })

  it('should return null if cannot undo', () => {
    expect(state.undo()).toBe(null)
  })

  it('should return null if cannot redo', () => {
    expect(state.redo()).toBe(null)
  })

  it('should reset to initial state', () => {
    expect(state.current.foo).toBe('zap')
    expect(state.update(updated()).current.foo).toBe('bar')
    expect(state.current.history.undo).toBe(true)
    expect(state.reset().current.foo).toBe('zap')
    expect(state.current.history.undo).toBe(false)
  })
})
