import Supply from './random-supply'

export default class Surplus extends Supply {
  constructor(config) {
    super(config)
    this.name = 'surplus'
  }
}
