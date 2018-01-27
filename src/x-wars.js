import cloneDeep from 'lodash.clonedeep'

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
const _config = new WeakMap()

/**
 * TODO: Add docs for @param config.
**/
export default class XWars {
  constructor(config) {
    this.initialize(config)
  }

  initialize(config) {
    _config.set(this, cloneDeep(config))
  }

  start() {
    //
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
    //
  }

  get(prop) {
    switch (prop) {
      case 'config':
        return cloneDeep(_config.get(this))
    }
  }
}
