import { cloneDeep } from 'lodash'

/**
 *
 */
export default class Place {
  constructor(place) {
    this.place = place
  }

  output() {
    return {
      place: cloneDeep(this.place),
    }
  }
}
