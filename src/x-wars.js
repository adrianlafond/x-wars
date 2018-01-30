import cloneDeep from 'lodash.clonedeep'
import Config from './config'
import Game from './game'
import History from './history'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const _config = new WeakMap()
const _game = new WeakMap()
const _history = new WeakMap()

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    this.initialize(config)
  }

  initialize(config) {
    _config.set(this, new Config(cloneDeep(config)))
  }

  start() {
    const history = _history.set(this, new History())
    const config = _config.get(this)
    const game = new Game(config, history)
    _game.set(this, game)
    return game.start()
  }

  reset() {
    //
  }

  quit() {
    //
  }

  do(action) {
    //
  }

  back() {
    //
  }

  forward() {
    //
  }

  go(n) {
    //
  }

  set(prop, val) {
    _config.get(this).set(prop, val)
  }

  get(prop) {
    switch (prop) {
      case 'config':
        return cloneDeep(_config.get(this))
    }
  }
}
