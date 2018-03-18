import find from 'lodash.find'
import Storage from './random-storage'
import Find from './random-find'
import Surplus from './random-surplus'
import Shortage from './random-shortage'

export default class Random {
  constructor(config = {}) {
    this.config = config
    this.data = [
      new Storage(this.item('storage')).data,
      new Find(this.item('find')).data,
      new Surplus(this.item('surplus')).data,
      new Shortage(this.item('shortage')).data,
    ]
  }

  item(name) {
    return find(this.config.random || [], (item) => item.name === name) || {}
  }
}
