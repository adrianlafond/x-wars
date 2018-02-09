import Player from '../src/player'
import defaults from '../src/defaults'

describe('Player', () => {

  let player
  let health = defaults.player.health.value
  let wealth = defaults.player.wealth.value
  let storage = defaults.player.storage.value

  beforeEach(() => {
    player = new Player(defaults.player)
  })

  it('data is private', () => {
    expect(player.data).toEqual(undefined)
  })

  // Health
  it('starts with perfect health', () => {
    expect(player.health).toBe(health)
  })
  it('increments health', () => {
    expect(--player.health).toBe(health - 1)
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
  it('increments wealth', () => {
    expect(--player.wealth).toBe(wealth - 1)
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

  // Storage
  it('starts with a storage value', () => {
    expect(player.storage).toBe(storage)
  })
  it('increments wealth', () => {
    expect(--player.storage).toBe(storage - 1)
    expect(++player.storage).toBe(storage)
  })
  it('prevents storage from descending below minimum', () => {
    player.storage = defaults.player.storage.min - 100
    expect(player.storage).toBe(0)
  })
  it('allows storage to reach Number.MAX_VALUE', () => {
    player.storage = Number.MAX_VALUE + 1
    expect(player.storage).toBe(Number.MAX_VALUE)
    player.storage = 999999999
    expect(player.storage).toBe(999999999)
  })

  // Weapons
  it('weapons length must >= 0', () => {
    expect(player.weapons.length).toBeGreaterThanOrEqual(0)
  })
  it('allows weapons to be added', () => {
    // expect(player.weapons.)
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
