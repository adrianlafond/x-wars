import OptionsInfo from '../src/options-info'
import State from '../src/state'

describe('options.info', () => {
  let state
  let instance
  // let info
  beforeEach(() => {
    state = new State()
    instance = new OptionsInfo(state)
    // info = instance.info
  })

  test('score', () => {
    const p1 = { money: { value: 25000000 } }
    expect(instance.getScore(p1)).toBe(50)
    const p2 = { money: { value: 999999999 } }
    expect(instance.getScore(p2)).toBe(100)
    const p3 = { money: { value: 1000 } }
    expect(instance.getScore(p3)).toBe(0)
  })
})
