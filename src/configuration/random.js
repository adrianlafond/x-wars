import find from 'lodash.find'
import Storage from './random-storage'

export default class Random {
  constructor(config = {}) {
    this.config = config
    this.data = [
      new Storage(this.item('storage')).data,
    ]
  }

  item(name) {
    return find(this.config.random || [], (item) => item.name === name) || {}
  }
}
