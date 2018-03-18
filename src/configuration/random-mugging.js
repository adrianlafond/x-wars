import RandomEnemy from './random-enemy'

export default class RandomMugging extends RandomEnemy {
  constructor(config) {
    super(config)
    this.name = 'mugging'
  }
}
