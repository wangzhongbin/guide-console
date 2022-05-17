import { SET_DICT, EMPTY_DICT } from './constants'

export default {
  [SET_DICT] (state, dict) {
    state.dict = dict
  },
  [EMPTY_DICT] (state, dict) {
    state.dict = []
  }
}
