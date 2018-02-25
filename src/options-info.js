
export default class OptionsInfo {
  constructor(state) {
    this.state = state
    this.info = this.getInfo()
  }

  getInfo() {
    const player = this.state.current.player
    return {
      time: player.time,
      location: player.location,
      loan: player.loan.asMutable({ deep: true }),
      money: player.money.value,
      health: player.health.value,
      storage: this.getInfoStorage(player),
      score: this.getScore(player),
    }
  }

  getInfoStorage(player) {
    return {
      value: player.storage.value,
      filled: player.storage.filled.asMutable({ deep: true }),
    }
  }

  // Score = $ * 2 / million, floored out of 100.
  // Example: $25,005,001 = 50,010,002 / 100,000,000 = 50/100.
  getScore(player) {
    const millions = player.money.value * 2 / 1000000
    return Math.min(100, Math.floor(millions))
  }
}
