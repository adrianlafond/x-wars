import Immutable from 'seamless-immutable'
import isPlainObject from 'lodash.isplainobject'
import DEFAULTS from './defaults.json'

function configureLocations(state) {
  if (!Array.isArray(state.locations)) {
    state.locations = DEFAULTS.locations
  }
  for (let i = state.locations.length - 1; i >= 0; i--) {
    const name = state.locations[i].name
    if (typeof name !== 'string' || !name) {
      state.locations.splice(i, 1)
    }
  }
  while (state.locations.length < 2) {
    state.locations.push(DEFAULTS.locations[state.locations.length])
  }
}

function configurePlayerLocation(state) {
  const loc = state.player.location
  if (loc) {
    if (typeof loc === 'string') {
      //
    }
  }
  const random = Math.floor(Math.random() * state.locations.length)
  state.player.location = {
    name: state.locations[random].name,
    value: random,
  }
}

function configurePlayer(state) {
  state.player = isPlainObject(state.player) ? state.player : {}
  configurePlayerLocation(state)
}

/**
 * Ensures initial game state is valid.
 */
export default function configure(state = null) {
  // Ensure state is a plain object.
  state = (state && state.asMutable) ? state.asMutable() : (state || DEFAULTS)
  configureLocations(state)
  configurePlayer(state)
  return Immutable(state || DEFAULTS)
}
