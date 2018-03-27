import find from 'lodash.find'
import Storage from './random-storage'
import Find from './random-find'
import Surplus from './random-surplus'
import Shortage from './random-shortage'
import Police from './random-police'
import Rival from './random-rival'
import Mugging from './random-mugging'
import Weapon from './random-weapon'

export default class Random {
  constructor(config = {}) {
    this.config = config
    this.data = [
      new Storage(this.item('storage')).getData(),
      new Find(this.item('find')).getData(),
      new Surplus(this.item('surplus')).getData(),
      new Shortage(this.item('shortage')).getData(),
      new Police(this.item('police')).getData(),
      new Rival(this.item('rival')).getData(),
      new Mugging(this.item('mugging')).getData(),
      new Weapon(this.item('weapon')).getData(),
    ]
  }

  item(name) {
    return find(this.config.random || [], (item) => item.name === name) || {}
  }
}
