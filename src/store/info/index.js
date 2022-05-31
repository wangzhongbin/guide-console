
import { SET_DOMAIN } from './constants'

import mutations from './mutations'

const state = {
  ossDomain: []
}

const actions = {
  setDomain ({ commit }, data) {
    commit(SET_DOMAIN, data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
