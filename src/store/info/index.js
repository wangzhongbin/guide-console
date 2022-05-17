
import { SET_MERCHANTS } from './constants'

import mutations from './mutations'

const state = {
  merchants: []
}

const actions = {
  setMerchants ({ commit }, merchants) {
    commit(SET_MERCHANTS, merchants)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
