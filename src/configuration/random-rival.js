import RandomEnemy from './random-enemy'

export default class RandomRival extends RandomEnemy {
  constructor(config) {
    super(config)
    this.name = 'rival'
  }
}
