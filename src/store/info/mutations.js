import { SET_DOMAIN } from './constants'

export default {
  [SET_DOMAIN] (state, data) {
    state.ossDomain = data
  }
}
