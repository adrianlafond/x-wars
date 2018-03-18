import RandomEnemy from './random-enemy'

export default class RandomPolice extends RandomEnemy {
  constructor(config) {
    super(config)
    this.name = 'police'
  }
}
