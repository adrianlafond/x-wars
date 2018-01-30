import cloneDeep from 'lodash.clonedeep'

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
