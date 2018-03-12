import Immutable from 'seamless-immutable'
import cloneDeep from 'lodash.clonedeep'
import isPlainObject from 'lodash.isplainobject'
import DEFAULTS from '../defaults.json'
import Player from './player'
import Locations from './locations'
import Items from './items'
import Weapons from './weapons'
import Random from './random'

export default class Configuration {
  constructor(config) {
    this.original = config
    this.data = initializeState(config)
    this.data.locations = new Locations(this.data).data
    this.data.items = new Items(this.data).data
    this.data.weapons = new Weapons(this.data).data
    this.data.random = new Random(this.data).data
    this.data.player = new Player(this.data).data
  }
}

function initializeState(config) {
  if (config && Immutable.isImmutable(config)) {
    return config.asMutable({ deep: true })
  } else if (isPlainObject(config)) {
    return cloneDeep(config)
  }
  return cloneDeep(DEFAULTS)
}
