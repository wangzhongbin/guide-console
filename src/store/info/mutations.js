import { SET_MERCHANTS, EMPTY_MERCHANTS } from './constants'

export default {
  [SET_MERCHANTS] (state, merchants) {
    state.merchants = merchants
  },
  [EMPTY_MERCHANTS] (state, merchants) {
    state.merchants = []
  }
}
