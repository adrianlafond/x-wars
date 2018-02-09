

const ITEMS = new WeakMap()

let n = 0;
function uid() {
  return n++
}

/**
 *
 */
export default class Weapons {
  constructor(initialItems = []) {
    const items = []
    ITEMS.set(this, items)
  }

  get length() {
    return ITEMS.get(this).length
  }

  add(item) {
    //
  }

  remove(item) {
    //
  }
}