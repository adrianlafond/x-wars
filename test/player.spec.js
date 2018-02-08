import Player from '../src/player'
import defaults from '../src/defaults'

describe('Player defaults', () => {

  let player
  let health = defaults.player.health.value
  let wealth = defaults.player.wealth.value

  beforeEach(() => {
    player = new Player(defaults.player)
  })

  it('has data', () => {
    expect(player.data).toEqual(defaults.player)
  })

  // Health
  it('starts with perfect health', () => {
    expect(player.health).toBe(health)
  })
  it('increments health down', () => {
    expect(--player.health).toBe(health - 1)
  })
  it('adds health up', () => {
    expect(++player.health).toBe(health)
  })
  it('prevents health from descending below minimum', () => {
    player.health = defaults.player.health.min - 100
    expect(player.health).toBe(0)
  })
  it('prevents health from exceeding the maximum', () => {
    player.health = defaults.player.health.max + 100
    expect(player.health).toBe(health)
  })

  // Wealth
  it('starts with a wealth value', () => {
    expect(player.wealth).toBe(wealth)
  })
  it('increments wealth down', () => {
    expect(--player.wealth).toBe(wealth - 1)
  })
  it('adds wealth up', () => {
    expect(++player.wealth).toBe(wealth)
  })
  it('prevents wealth from descending below minimum', () => {
    player.wealth = defaults.player.wealth.min - 100
    expect(player.wealth).toBe(0)
  })
  it('allows wealth to reach Number.MAX_VALUE', () => {
    player.wealth = Number.MAX_VALUE + 1
    expect(player.wealth).toBe(Number.MAX_VALUE)
    player.wealth = 999999999
    expect(player.wealth).toBe(999999999)
  })
})

describe('Player: invalid data', () => {
  it('should throw an error', () => {
    expect(() => new Player()).toThrow()
    expect(() => new Player([])).toThrow()
    expect(() => new Player(() => {})).toThrow()
    expect(() => new Player(null)).toThrow()
    expect(() => new Player(0/0)).toThrow()
    expect(() => new Player('data')).toThrow()
    expect(() => new Player(13)).toThrow()
    expect(() => new Player({})).toThrow()
  })
})
