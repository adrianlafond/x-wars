import Supply from './random-supply'

export default class Shortage extends Supply {
  constructor(config) {
    super(config)
    this.name = 'shortage'
  }
}
